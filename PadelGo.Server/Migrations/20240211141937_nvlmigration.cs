using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PadelGo.Migrations
{
    /// <inheritdoc />
    public partial class nvlmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PoidsEquipe",
                table: "Equipes",
                newName: "ClassementJoueur2");

            migrationBuilder.AddColumn<int>(
                name: "ClassementJoueur1",
                table: "Equipes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "MailJoueur1",
                table: "Equipes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MailJoueur2",
                table: "Equipes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassementJoueur1",
                table: "Equipes");

            migrationBuilder.DropColumn(
                name: "MailJoueur1",
                table: "Equipes");

            migrationBuilder.DropColumn(
                name: "MailJoueur2",
                table: "Equipes");

            migrationBuilder.RenameColumn(
                name: "ClassementJoueur2",
                table: "Equipes",
                newName: "PoidsEquipe");
        }
    }
}
