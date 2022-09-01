using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dominio;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistencia;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Encargado de construir y ejecutar nuestra aplicacion
           var hostserver =  CreateHostBuilder(args).Build();
           using (var ambiente = hostserver.Services.CreateScope()){
                var services = ambiente.ServiceProvider;
                
                try{
                var userManager = services.GetRequiredService<UserManager<Usuario>>();
                var context = services.GetRequiredService<CursosOnlineContext>();
                context.Database.Migrate();
                DataPrueba.InsertData(context, userManager).Wait();
                }
                catch (Exception ex){
                    var logging = services.GetRequiredService<ILogger<Program>>();
                    logging.LogError(ex, "Ocurrió un error en la migración");    
                }
           }

           hostserver.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            //Toma la configuracion de de appsetting.json en produccion
            //y appsettingdvelopement.json en desarrollo
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
