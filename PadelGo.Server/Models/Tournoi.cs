using System.ComponentModel.DataAnnotations.Schema;
using PadelGo.Data;
namespace PadelGo.Models;
public class Tournoi
{
    public int TournoiId { get; set; }
    public string Categorie { get; set; } // Consider using an enum for categories
    public string Niveau { get; set; } // Consider using an enum for levels
    public string Date { get; set; }
    public int NombreEquipe { get; set; }
    public List<Equipe> Equipes { get; set; }

    public Tournoi()
    {
        Equipes = new List<Equipe>();
    }
}