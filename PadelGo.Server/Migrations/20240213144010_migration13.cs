using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PadelGo.Migrations
{
    /// <inheritdoc />
    public partial class migration13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipes_Tournois_TournoiId",
                table: "Equipes");

            migrationBuilder.AlterColumn<int>(
                name: "TournoiId",
                table: "Equipes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Equipes_Tournois_TournoiId",
                table: "Equipes",
                column: "TournoiId",
                principalTable: "Tournois",
                principalColumn: "TournoiId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipes_Tournois_TournoiId",
                table: "Equipes");

            migrationBuilder.AlterColumn<int>(
                name: "TournoiId",
                table: "Equipes",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipes_Tournois_TournoiId",
                table: "Equipes",
                column: "TournoiId",
                principalTable: "Tournois",
                principalColumn: "TournoiId");
        }
    }
}
