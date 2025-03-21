using System;
using System.Configuration;
using System.Linq;
using ControleDeAnimaisSilvestres.Dominio.Objetos;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;
using ControleDeAnimaisSilvestres.Infra.Migracoes;
using ControleDeAnimaisSilvestres.Infra.Repositorios;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Initialization;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace projetocodersgrowth
{
    internal static class Program
    {
        private static string stringDeConexao = ConfigurationManager.ConnectionStrings["BancoDeDados"].ConnectionString;

        [STAThread]
        static void Main(string[] args)
        {
            var builder = CriaHostBuilder();
            var servicesProvider = builder.Build().Services;
            var repositorio = servicesProvider.GetService<IRepositorio>();
            var validacao = servicesProvider.GetService<ValidacaoDeAnimalSilvestre>();

            using (var serviceProvider = CreateServices())
            using (var scope = serviceProvider.CreateScope())
            {
                UpdateDatabase(scope.ServiceProvider);
            }

            ApplicationConfiguration.Initialize();
            Application.Run(new Lista(repositorio, validacao));
        }

        static IHostBuilder CriaHostBuilder()
        {
            return Host.CreateDefaultBuilder().ConfigureServices((context, services) => {
                services.AddScoped<IRepositorio, RepositorioLinqToDb>();
                services.AddScoped<ValidacaoDeAnimalSilvestre>();
            });
        }

        private static ServiceProvider CreateServices()
        {
            return new ServiceCollection()
                .AddFluentMigratorCore()
                .ConfigureRunner(rb => rb
                    .AddSqlServer()
                    .WithGlobalConnectionString(stringDeConexao)
                    .ScanIn(typeof(_20231122102000_CriaTabelaAnimaisSilvestres).Assembly).For.Migrations())
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