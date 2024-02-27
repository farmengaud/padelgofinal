using PadelGo.Models;
using PadelGo.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using BCrypt.Net;


namespace PadelGo.Controllers
{
    [ApiController]
    [Route("api/utilisateur")]
    public class UtilisateurController : ControllerBase
    {
        private readonly PadelGoContexte _context;

        public UtilisateurController(PadelGoContexte context)
        {
            _context = context;
        }

        // GET: api/utilisateur
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Utilisateur>>> GetUtilisateurs()
        {
            return await _context.Utilisateurs.ToListAsync();
        }



    [HttpPost("inscription")]
public IActionResult PostUtilisateur([FromBody] UtilisateurinscriptionDTOpost utilisateurDTO)
{
    if (utilisateurDTO == null)
    {
        return BadRequest("Erreur : il faut remplir les informations du nouvel utilisateur.");
    }

    // Vérifiez si l'e-mail est déjà utilisé
var utilisateurExistant = _context.Utilisateurs.FirstOrDefault(u => u.Mail == utilisateurDTO.Mail);
if (utilisateurExistant != null)
{
    return StatusCode(409, "Cette adresse e-mail est déjà utilisée par un autre compte.");
}

    // Hachage du mot de passe
    string motDePasseHaché = BCrypt.Net.BCrypt.HashPassword(utilisateurDTO.MotDePasse);

    Utilisateur nouvelUtilisateur = new Utilisateur
    {
        Nom = utilisateurDTO.Nom,
        Prenom = utilisateurDTO.Prenom,
        Mail = utilisateurDTO.Mail,
        MotDePasse = motDePasseHaché, // Utilisez le mot de passe haché
        Classement = utilisateurDTO.Classement

    };

    _context.Utilisateurs.Add(nouvelUtilisateur);
    try
    {
        _context.SaveChanges();
    }
    catch (Exception ex)
    {
        // Gérer les exceptions possibles comme les erreurs de base de données ici
        return StatusCode(500, "Une erreur interne est survenue.");
    }

    return Ok("Inscription réussie");
}


        [HttpPost("connexion")]
public IActionResult PostConnexion([FromBody] UtilisateurconnexionDTOpost utilisateurDTO)
{
    if (utilisateurDTO == null)
    {
        return BadRequest("Les données de connexion sont requises.");
    }

    // Trouver l'utilisateur par email
    var utilisateur = _context.Utilisateurs.FirstOrDefault(u => u.Mail == utilisateurDTO.Mail);
    
    // Vérifier le mot de passe si l'utilisateur est trouvé
    if (utilisateur != null && BCrypt.Net.BCrypt.Verify(utilisateurDTO.MotDePasse, utilisateur.MotDePasse))
    {
        // Si l'authentification est réussie, retourner les informations utilisateur
        var userInfo = new
        {
            Nom = utilisateur.Nom,
            Prenom = utilisateur.Prenom,
            Email = utilisateur.Mail // Assurez-vous que c'est le bon champ pour l'email dans votre base de données
        };

        return Ok(userInfo); // Retourne les informations de l'utilisateur
    }
    else
    {
        // Si l'authentification échoue, retourner une erreur générique
        return Unauthorized("L’e-mail ou le mot de passe ne correspond pas.");
    }
}


[HttpGet("getNomPrenomParEmail")]
        public ActionResult GetNomPrenomParEmail([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Un email est nécessaire pour cette requête.");
            }

            var utilisateur = _context.Utilisateurs
                .Where(u => u.Mail == email)
                .Select(u => new { u.Nom, u.Prenom })
                .FirstOrDefault();

            if (utilisateur == null)
            {
                return NotFound("Aucun utilisateur trouvé pour cet email.");
            }

            return Ok(utilisateur);
        }

        [HttpPut("updateClassement")]
public IActionResult UpdateClassement([FromBody] UtilisateurDTOput utilisateurDTO)
{
    if (utilisateurDTO == null)
    {
        return BadRequest("Les données de mise à jour sont requises.");
    }

    if (string.IsNullOrEmpty(utilisateurDTO.Email))
    {
        return BadRequest("L'email est obligatoire pour la mise à jour.");
    }

    var utilisateur = _context.Utilisateurs.FirstOrDefault(u => u.Mail == utilisateurDTO.Email);
    if (utilisateur == null)
    {
        return NotFound("Utilisateur non trouvé.");
    }

    // Supposons que vous ayez validé que le classement est un entier positif, etc.
    utilisateur.Classement = utilisateurDTO.Classement;

    try
    {
        _context.Utilisateurs.Update(utilisateur);
        _context.SaveChanges();
        return Ok($"Classement de l'utilisateur mis à jour avec succès au {utilisateurDTO.Classement}.");
    }
    catch (Exception ex)
    {
        // Log l'exception ici
        return StatusCode(500, "Une erreur interne est survenue lors de la mise à jour du classement.");
    }
}


}}


