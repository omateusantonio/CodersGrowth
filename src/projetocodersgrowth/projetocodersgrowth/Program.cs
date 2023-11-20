using System;
using System.Configuration;
using System.Linq;
using ControleDeAnimaisSilvestres.Dominio;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Initialization;

using Microsoft.Extensions.DependencyInjection;

namespace projetocodersgrowth
{
    internal static class Program
    {
        private static string stringDeConexao = ConfigurationManager.ConnectionStrings["BancoDeDados"].ConnectionString;

        [STAThread]
        static void Main(string[] args)
        {
            using (var serviceProvider = CreateServices())
            using (var scope = serviceProvider.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }
            ApplicationConfiguration.Initialize();
            Application.Run(new Lista());
        }


        private static ServiceProvider CreateServices()
        {
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(stringDeConexao)
                    .ScanIn(typeof(CriaTabelaAnimaisSilvestres).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);
        }

        private static void UpdateDatabase(IServiceProvider serviceProvider)
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();
            runner.MigrateUp();
        }
    }
}