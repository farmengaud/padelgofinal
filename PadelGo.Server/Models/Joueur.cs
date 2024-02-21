using System.ComponentModel.DataAnnotations.Schema;
using PadelGo.Data;

namespace PadelGo.Models;
public class Joueur
{
    public int JoueurId { get; set; }
    public string Nom { get; set; }
    public string Prenom { get; set; }
    public string Mail { get; set; }
    public string NumeroLicence { get; set; }
    public int Classement { get; set; }

}