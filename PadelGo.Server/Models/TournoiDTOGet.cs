namespace PadelGo.Models;

public class TournoiDTOGet
{
    public string Categorie { get; set; } // Consider using an enum for categories
    public string Niveau { get; set; } // Consider using an enum for levels
    public string Date { get; set; }
    public int NombreEquipe { get; set; }
    public int TournoiId { get; set; }
}