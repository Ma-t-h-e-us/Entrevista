using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using UsersData.Domains;

#nullable disable

namespace UsersData.Context
{
    public partial class UsersDataContext : DbContext
    {
        public UsersDataContext()
        {
        }

        public UsersDataContext(DbContextOptions<UsersDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<UserStatus> UserStatuses { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<UserU> UserUs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-EJ47PRO\\SQLEXPRESS; Initial Catalog=UsersData; user id=sa; pwd=senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<UserStatus>(entity =>
            {
                entity.HasKey(e => e.IdStatus)
                    .HasName("PK__userStat__01936F74CD58E513");

                entity.ToTable("userStatus");

                entity.HasIndex(e => e.StatusName, "UQ__userStat__6A50C212A092CA8F")
                    .IsUnique();

                entity.Property(e => e.IdStatus).HasColumnName("idStatus");

                entity.Property(e => e.StatusName)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("statusName");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.HasKey(e => e.IdType)
                    .HasName("PK__userType__4BB98BC632328F2E");

                entity.ToTable("userType");

                entity.HasIndex(e => e.TypeName, "UQ__userType__A20CDB583FA70282")
                    .IsUnique();

                entity.Property(e => e.IdType).HasColumnName("idType");

                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("typeName");
            });

            modelBuilder.Entity<UserU>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__userU__3717C982458AC9AB");

                entity.ToTable("userU");

                entity.HasIndex(e => e.Email, "UQ__userU__AB6E61644C304725")
                    .IsUnique();

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdStatus).HasColumnName("idStatus");

                entity.Property(e => e.IdType).HasColumnName("idType");

                entity.Property(e => e.NameUser)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("nameUser");

                entity.Property(e => e.Passwd)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("passwd");

                entity.HasOne(d => d.IdStatusNavigation)
                    .WithMany(p => p.UserUs)
                    .HasForeignKey(d => d.IdStatus)
                    .HasConstraintName("FK__userU__idStatus__2C3393D0");

                entity.HasOne(d => d.IdTypeNavigation)
                    .WithMany(p => p.UserUs)
                    .HasForeignKey(d => d.IdType)
                    .HasConstraintName("FK__userU__idType__2B3F6F97");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
