using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PrivEng.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecordDataController : Controller
    {
        [HttpGet]
        public IEnumerable<RecordData> Get()
        {
            List<RecordData> data = new List<RecordData>();
            bool ok = true;
            foreach (string line in System.IO.File.ReadLines("./dataset.csv"))
            {
                if (ok)
                    ok = !ok; // skipping CSV header
                else
                {
                    string[] values = line.Split(',');
                    RecordData newEntry = new RecordData();
                    newEntry.Name = values[0];
                    newEntry.Gender = values[1];
                    newEntry.Dob = DateTime.Parse("1/" + values[2]);
                    newEntry.Home_postcode = values[3];
                    newEntry.Work_postcode = values[4];
                    newEntry.Education = values[5];
                    newEntry.Employment = values[6];
                    newEntry.Children = Int32.Parse(values[7]);
                    newEntry.Marital_status = values[8];
                    newEntry.Number_vehicles = Int32.Parse(values[9]);
                    newEntry.Commute_time = Double.Parse(values[10]);
                    newEntry.Accommodation = values[11];
                    newEntry.Number_of_co_morbidities = Int32.Parse(values[12]);
                    newEntry.Disease = values[13];

                    data.Add(newEntry);
                }
            }

            return data;
        }
    }
}
