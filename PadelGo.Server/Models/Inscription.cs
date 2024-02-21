using System.ComponentModel.DataAnnotations.Schema;
using PadelGo.Data;

namespace PadelGo.Models;
public class Inscription
{
    public int InscriptionId{ get; set; }
    public Joueur Joueur { get; set; }
    public Tournoi Tournoi { get; set; }
    public DateTime DateInscription { get; set; }
    public bool EstConfirmee { get; set; }

}
