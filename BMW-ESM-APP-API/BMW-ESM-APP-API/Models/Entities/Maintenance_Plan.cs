﻿using System;
using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Maintenance_Plan
    {
        [Key]
        public int MaintenancePlanID { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
        public string Plan_Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
    }
}