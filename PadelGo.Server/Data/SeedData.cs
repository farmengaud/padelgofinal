using PadelGo.Models;
namespace PadelGo.Data;
public static class SeedData
{
    // Test data for part 1 and 2
    public static void Init()
    {
        using var context = new PadelGoContexte();
        // Look for existing content
        if (context.Utilisateurs.Any())
        {
            return;   // DB already filled
        }

        // Add Utilisateur
        Utilisateur Fabas = new()
        {
            UtilisateurId= 1,
            Nom = "Fabas",
            Prenom = "Julen",
            Mail = "Julen.Fabas@gmail.com",
            MotDePasse ="chaton3"
        };

        context.Utilisateurs.AddRange(Fabas);

        // Add Club
        Club Adour = new()
        {
            Region= "Aquitaine",
            Ville = "Tarnos",
            Nom = "Club de l'Adour"
        };
        context.Clubs.AddRange(
            Adour
);
        // Commit changes into DB
        context.SaveChanges();
    }
}