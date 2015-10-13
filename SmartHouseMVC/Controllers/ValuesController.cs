using SmartHouse.Models;
using SmartHouseMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SmartHouseMVC.Controllers
{
    public class ValuesController : ApiController
    {
        [Route("api/values/fan/{id}")]
        public Fan GetFanOnOff(int id)
        {
            ModelContext db = new ModelContext();
            db.Fans.Find(id).OnOff();
            db.SaveChanges();

            return db.Fans.Include("Speed").FirstOrDefault(p => p.Id == id);
        }

        [Route("api/values/lamp/{id}")]
        public Lamp GetLampOnOff(int id)
        {
            ModelContext db = new ModelContext();
            db.Lamps.Find(id).OnOff();
            db.SaveChanges();

            return db.Lamps.Find(id);
        }

        [Route("api/values/louvers/{id}")]
        public Louvers GetLouversOnOff(int id)
        {
            ModelContext db = new ModelContext();
            db.LouversSet.Find(id).OnOff();
            db.SaveChanges();

            return db.LouversSet.Include("Open").FirstOrDefault(p => p.Id == id);
        }

        [Route("api/values/tv/{id}")]
        public Tv GetTvOnOff(int id)
        {
            ModelContext db = new ModelContext();
            db.TvSet.Find(id).OnOff();
            db.SaveChanges();

            return db.TvSet.Include("Volume").FirstOrDefault(p => p.Id == id);
        }
    }
}