using ControleDeAnimaisSilvestres.Infra.Repositorios;
using ControleDeAnimaisSilvestres.Dominio.Validacoes;
using ControleDeAnimaisSilvestres.Infra.Migracoes;
using FluentMigrator.Runner;
using LinqToDB;
using LinqToDB.AspNet;
using LinqToDB.AspNet.Logging;
using Microsoft.AspNetCore.StaticFiles;


namespace ControleDeAnimaisSilvestres.WebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.

            var stringDeConexao = builder.Configuration.GetConnectionString("_BancoDeDados");

            builder.Services.AddLinqToDB((provider, options) => options
            .UseSqlServer(stringDeConexao)
            .UseDefaultLogging(provider));

            builder.Services.AddScoped<IRepositorio, RepositorioLinqToDb>();
            builder.Services.AddScoped<ValidacaoDeAnimalSilvestre>();
            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                RedirectToAppendTrailingSlash = true,
                ContentTypeProvider = new FileExtensionContentTypeProvider
                {
                    Mappings = { [".properties"] = "application/x-msdownload" }
                }
            });

            app.UseDefaultFiles();

            app.UseFileServer();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
     
    }
}

