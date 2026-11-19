package com.biblioteca.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "livros")
@Data
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título é obrigatório")
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    private String titulo;

    @Size(max = 20)
    @Column(length = 20)
    private String isbn;

    @Column(name = "ano_publicacao")
    private Integer anoPublicacao;

    @Size(max = 50)
    @Column(length = 50)
    private String genero;

    // O relacionamento fica só deste lado (N). Autor não tem List<Livro>,
    // para evitar loop infinito na serialização JSON.
    @NotNull(message = "O autor é obrigatório")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "autor_id", nullable = false) // cria a coluna FK
    private Autor autor;

    @Column(name = "criado_em", updatable = false)
    private LocalDateTime criadoEm;

    @PrePersist
    void aoCriar() {
        this.criadoEm = LocalDateTime.now();
    }
}
