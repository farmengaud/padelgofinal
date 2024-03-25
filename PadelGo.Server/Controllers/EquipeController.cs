using PadelGo.Models;
using PadelGo.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace PadelGo.Controllers
{
    [ApiController]
    [Route("api/equipe")]
    public class EquipeController : ControllerBase
    {
        private readonly PadelGoContexte _context;

        public EquipeController(PadelGoContexte context)
        {
            _context = context;
        }

        // POST: api/equipe
        [HttpPost]
public async Task<ActionResult<Equipe>> PostEquipe([FromBody] EquipeDTOpost equipeDTO)
{
    if (equipeDTO == null)
    {
        return BadRequest("Données de l'équipe manquantes.");
    }

    var equipe = new Equipe
    {
        NomJoueur1 = equipeDTO.NomJoueur1,
        ClassementJoueur1 = equipeDTO.ClassementJoueur1,
        MailJoueur1 = equipeDTO.MailJoueur1,
        NomJoueur2 = equipeDTO.NomJoueur2,
        ClassementJoueur2 = equipeDTO.ClassementJoueur2,
        MailJoueur2 = equipeDTO.MailJoueur2,
    };

    _context.Equipes.Add(equipe);
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetEquipe", new { id = equipe.EquipeId }, new { equipeId = equipe.EquipeId });
}

            // GET: api/equipe/{id}
[HttpGet("{id}")]
public async Task<ActionResult<Equipe>> GetEquipe(int id)
{
    var equipe = await _context.Equipes.FindAsync(id);

    if (equipe == null)
    {
        return NotFound();
    }

    return equipe;
}
// PUT: api/equipe/{id}/updateClassement
[HttpPut("{id}/updateClassement")]
public async Task<IActionResult> UpdateClassementEquipe(int id, [FromBody] EquipeDTOput equipeClassementDTO)
{
    var equipe = await _context.Equipes.FindAsync(id);
    if (equipe == null)
    {
        return NotFound();
    }

    // Mise à jour des classements uniquement
    equipe.ClassementJoueur1 = equipeClassementDTO.ClassementJoueur1;
    equipe.ClassementJoueur2 = equipeClassementDTO.ClassementJoueur2;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (Exception ex) 
    {
        return StatusCode(500, "Une erreur interne est survenue lors de la mise à jour des classements.");
    }

    return NoContent(); 
}


    }
}
