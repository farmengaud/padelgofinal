
using System.ComponentModel.DataAnnotations.Schema;
using PadelGo.Data;

namespace PadelGo.Models;
public class Administrateur 
{
    public int AdministrateurId { get; set; }
    public string Nom { get; set; }
    public string Prenom { get; set; }
    public string Mail { get; set; }
    // public void CreerTournoi(/* Paramètres pour la création d'un tournoi */)
    // {
    //     // Logique de création d'un tournoi
    // }
}