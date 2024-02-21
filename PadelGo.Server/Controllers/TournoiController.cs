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
    [Route("api/tournoi")]
    public class TournoiController : ControllerBase
    {
        private readonly PadelGoContexte _context;

        public TournoiController(PadelGoContexte context)
        {
            _context = context;
        }

        // POST: api/tournoi
        [HttpPost]
        public async Task<ActionResult<Tournoi>> PostTournoi([FromBody] TournoiDTOpost tournoiDTO)
        {
            if (tournoiDTO == null)
            {
                return BadRequest("Les données du tournoi sont requises.");
            }

            var tournoi = new Tournoi
            {
                Categorie = tournoiDTO.Categorie,
                Niveau = tournoiDTO.Niveau,
                Date = tournoiDTO.Date,
                NombreEquipe = tournoiDTO.NombreEquipe
            };

            _context.Tournois.Add(tournoi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTournoi", new { id = tournoi.TournoiId }, tournoi);
        }

        // GET: api/tournoi/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Tournoi>> GetTournoi(int id)
        {
            var tournoi = await _context.Tournois.FindAsync(id);

            if (tournoi == null)
            {
                return NotFound();
            }

            return tournoi;
        }
        // GET: api/tournoi
[HttpGet]
public async Task<ActionResult<IEnumerable<TournoiDTOpost>>> GetAllTournois()
{
    var tournois = await _context.Tournois
        .Select(t => new TournoiDTOpost 
        { 
            Categorie = t.Categorie, 
            Niveau = t.Niveau, 
            Date = t.Date, 
            NombreEquipe = t.NombreEquipe 
        })
        .ToListAsync();
        
    return tournois;
}
// DELETE: api/tournoi/{id}
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteTournoi(int id)
{
    var tournoi = await _context.Tournois.FindAsync(id);
    if (tournoi == null)
    {
        return NotFound();
    }

    _context.Tournois.Remove(tournoi);
    await _context.SaveChangesAsync();

    return NoContent(); // Retourne une réponse 204 (No Content) si la suppression a réussi
}



// POST: api/tournoi/{tournoiId}/addEquipe
[HttpPost("{tournoiId}/addEquipe")]
public async Task<IActionResult> AddEquipeToTournoi(int tournoiId, [FromBody] int equipeId)
{
    var tournoi = await _context.Tournois.Include(t => t.Equipes).FirstOrDefaultAsync(t => t.TournoiId == tournoiId);
    if (tournoi == null)
    {
        return NotFound("Tournoi non trouvé.");
    }

    var equipe = await _context.Equipes.FindAsync(equipeId);
    if (equipe == null)
    {
        return NotFound("Équipe non trouvée.");
    }

    tournoi.Equipes.Add(equipe);
    await _context.SaveChangesAsync();

    return Ok("Équipe ajoutée au tournoi.");
}

// GET: api/tournoi/{tournoiId}/equipes
[HttpGet("{tournoiId}/equipes")]
public async Task<ActionResult<IEnumerable<Equipe>>> GetEquipesForTournoi(int tournoiId)
{
    var tournoi = await _context.Tournois.Include(t => t.Equipes).FirstOrDefaultAsync(t => t.TournoiId == tournoiId);
    if (tournoi == null)
    {
        return NotFound("Tournoi non trouvé.");
    }

    return tournoi.Equipes;
}
    }
}
