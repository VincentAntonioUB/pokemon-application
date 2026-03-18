import { Component, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Pokemon, PokemonService } from '../pokemonservice.service';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  pokemonService = inject(PokemonService);
  fb = inject(FormBuilder);
  pokemonForm = signal<FormGroup | null>(null);  // ✅ Initially null
  pokemons = signal<Pokemon[]>([]);

  ngOnInit() {
    // ✅ Create form AFTER inject() works
    this.pokemonForm.set(this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]],  // ✅ Default 1
      nature: ['', Validators.required]
    }));

    // Load existing Pokemon
    this.pokemonService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.pokemons.set(pokemons);
    });
  }

  addPokemon() {
    if (this.pokemonForm()?.valid) {
      this.pokemonService.addPokemon(this.pokemonForm()!.value).subscribe(() => {
        this.pokemons.update(pokemons => [...pokemons, this.pokemonForm()!.value]);
        this.pokemonForm.set(this.fb.group({
          name: '', type: '', level: 1, nature: ''
        }));
      });
    }
  }
}
