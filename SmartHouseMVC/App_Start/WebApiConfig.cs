using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WebApplication1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ApiOnOffLamp",
                routeTemplate: "api/{controller}/lamp/{id}"
            );

            config.Routes.MapHttpRoute(
                name: "ApiOnOffFan",
                routeTemplate: "api/{controller}/fan/{id}"
            );

            config.Routes.MapHttpRoute(
                name: "ApiOnOffLouvers",
                routeTemplate: "api/{controller}/louvers/{id}"
            );

            config.Routes.MapHttpRoute(
                name: "ApiOnOffTv",
                routeTemplate: "api/{controller}/tv/{id}"
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

        }
    }
}
