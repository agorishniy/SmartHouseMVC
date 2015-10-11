using SmartHouse.Models;
using SmartHouseMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartHouseMVC.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View(GetListDevice(new ModelContext()));
        }
        public ActionResult Add(string sName, string sType)
        {
            ModelContext db = new ModelContext();

            switch (sType)
            {
                case "Lamp":
                    db.Lamps.Add(new Lamp(sName, false));
                    break;
                case "Fan":
                    db.Fans.Add(new Fan(sName, false, 1));
                    break;
                case "Louvers":
                    db.LouversSet.Add(new Louvers(sName, false, 1));
                    break;
                case "Tv":
                    db.TvSet.Add(new Tv(sName, false, Channels.football, 2));
                    break;
            }
            db.SaveChanges();

            return View("Index", GetListDevice(db));
        }

        public ActionResult Del(int id, string sType)
        {
            ModelContext db = new ModelContext();

            switch (sType)
            {
                case "Lamp":
                    db.Lamps.Remove((Lamp)db.Lamps.Find(id));
                    break;
                case "Fan":
                    db.Fans.Remove((Fan)db.Fans.Find(id));
                    break;
                case "Louvers":
                    db.LouversSet.Remove((Louvers)db.LouversSet.Find(id));
                    break;
                case "Tv":
                    db.TvSet.Remove((Tv)db.TvSet.Find(id));
                    break;
            }
            db.SaveChanges();

            return View("Index", GetListDevice(db));
        }

        public ActionResult OnOff(int id, string sType)
        {
            ModelContext db = new ModelContext();

            switch (sType)
            {
                case "Lamp":
                    db.Lamps.Find(id).OnOff();
                    break;
                case "Fan":
                    db.Fans.Find(id).OnOff();
                    break;
                case "Louvers":
                    db.LouversSet.Find(id).OnOff();
                    break;
                case "Tv":
                    db.TvSet.Find(id).OnOff();
                    break;
            }
            db.SaveChanges();

            return View("Index", GetListDevice(db));
        }

        public ActionResult Down(int id, string sType, string sParam)
        {
            ModelContext db = new ModelContext();
            //IDevice d;

            switch (sType)
            {
                case "Fan":
                    Fan fan = db.Fans.Include("Speed").FirstOrDefault(p => p.Id == id);
                    fan.Speed.Down();
                    db.Entry(fan).State = EntityState.Modified;
                    break;
                case "Louvers":
                    Louvers louvers = db.LouversSet.Include("Open").FirstOrDefault(p => p.Id == id);
                    louvers.Open.Down();
                    db.Entry(louvers).State = EntityState.Modified;
                    break;
                case "Tv":
                    switch (sParam)
                    {
                        case "Volume":
                            Tv tv = db.TvSet.Include("Volume").FirstOrDefault(p => p.Id == id);
                            tv.Volume.Down();
                            db.Entry(tv).State = EntityState.Modified;
                            break;
                        case "Program":
                            db.TvSet.Find(id).PreviousChannel();
                            break;
                    }
                    break;
            }
            db.SaveChanges();

            return View("Index", GetListDevice(db));
        }

        public ActionResult Up(int id, string sType, string sParam)
        {
            ModelContext db = new ModelContext();
            //IDevice d;

            switch (sType)
            {
                case "Fan":
                    Fan fan = db.Fans.Include("Speed").FirstOrDefault(p => p.Id == id);
                    fan.Speed.Up();
                    db.Entry(fan).State = EntityState.Modified;
                    break;
                case "Louvers":
                    Louvers louvers = db.LouversSet.Include("Open").FirstOrDefault(p => p.Id == id);
                    louvers.Open.Up();
                    db.Entry(louvers).State = EntityState.Modified;
                    break;
                case "Tv":
                    switch (sParam)
                    {
                        case "Volume":
                            Tv tv = db.TvSet.Include("Volume").FirstOrDefault(p => p.Id == id);
                            tv.Volume.Up();
                            db.Entry(tv).State = EntityState.Modified;
                            break;
                        case "Program":
                            db.TvSet.Find(id).NextChannel();
                            break;
                    }
                    break;
            }
            db.SaveChanges();

            return View("Index", GetListDevice(db));
        }

        public static List<IDevice> GetListDevice(ModelContext db)    
        {
            List<IDevice> dev = new List<IDevice>();

            foreach (var item in db.Lamps.ToList())
            {
                dev.Add(item);
            }
            foreach (var item in db.LouversSet.Include("Open").ToList())
            {
                dev.Add(item);
            }
            foreach (var item in db.Fans.Include("Speed").ToList())
            {
                dev.Add(item);
            }
            foreach (var item in db.TvSet.Include("Volume").ToList())
            {
                dev.Add(item);
            }

            return dev;
        }
    }
}