using System.ComponentModel.DataAnnotations;

namespace BMW_ESM_APP_API.Models.Entities
{
    public class Title
    {
        [Key]
        public int TitleID { get; set; }
        public string Description { get; set; }

    }
}
