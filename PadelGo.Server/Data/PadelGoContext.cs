using Microsoft.EntityFrameworkCore;
using PadelGo.Models;
namespace PadelGo.Data;

public class PadelGoContexte : DbContext
{
    public DbSet<Utilisateur> Utilisateurs { get; set; } = null!;
    public DbSet<Joueur> Joueurs { get; set; }
    public DbSet<Administrateur> Administrateurs { get; set; }
    public DbSet<Club> Clubs { get; set; }
    public DbSet<Tournoi> Tournois { get; set; }
    public DbSet<Equipe> Equipes { get; set; }
    public DbSet<Inscription> Inscriptions { get; set; }
   
    public string DbPath { get; private set; }

    public PadelGoContexte()
    {
        
        DbPath = "PadelGo.db";
    }


   
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        
        options.UseSqlite($"Data Source={DbPath}");
    
    }
    


}