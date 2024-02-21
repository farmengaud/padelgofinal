using System.ComponentModel.DataAnnotations.Schema;
using PadelGo.Data;

namespace PadelGo.Models;
public class Club
{
    public int ClubId { get; set; }
    public string Region { get; set; }
    public string Ville { get; set; }
    public string Nom { get; set; }
    public List<Tournoi> Tournois { get; set; }

    public Club()
    {
        Tournois = new List<Tournoi>();
    }
}