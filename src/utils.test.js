import { describe, expect, it } from "vitest";
import { comparerTexte , estCarteCachee, nombreEvents } from "./utils.js";

describe("comparerTexte", () => {
    it("doit comparer le texte de la search barre et le titre de chaque carte",()=>{
        expect(comparerTexte("Concert de jazz", "jazz")).toEqual(true);
    })
    it("doit renvoyer false si le titre ne contient pas le texte recherché", () => {
        expect(comparerTexte("Concert de jazz", "musee")).toEqual(false);
    })
    })

describe("estCarteCachee", () => {
    it("doit renvoyer false si l'index est inferieur a 50",() => {
        expect(estCarteCachee(36)).toEqual (false)
    })
    it("doit renvoyer true si l'index est superieur a 50", () =>{
        expect(estCarteCachee(70)).toEqual (true)

    })
})    

describe("nombreEvents", () => {
  it("doit renvoyer le nombre d'éléments du tableau", () => {
    expect(nombreEvents([1, 2, 3])).toEqual(3);
  });

  it("doit renvoyer 0 pour un tableau vide", () => {
    expect(nombreEvents([])).toEqual(0);
  });
});
