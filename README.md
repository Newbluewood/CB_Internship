# Simulacija košarkaškog turnira (Olimpijske igre)

CLI program koji simulira grupnu fazu, žreb po šeširima i eliminacionu fazu turnira. Projekat je urađen kao **Codebehind internship** zadatak u čistom JavaScript-u, bez eksternih npm paketa.

**Autor:** Nebojsa Simović (@Newbluewood)

## Specifikacija zadatka

Puni tekst zahteva (grupna faza, žreb, eliminacija, bonus) nalazi se u **[ZADATAK.md](./ZADATAK.md)**.

## Zahtevi

- **Node.js** `v20.17.0` (preporuka iz zadatka; projekat koristi ES module — `"type": "module"`)

## Pokretanje

```bash
npm start
```

Ili direktno: `node app.js`

Izlaz je celokupan tok turnira u konzoli (grupna faza → tabele → šeširi → četvrtfinale / polufinale → medalje).

## Struktura projekta

| Putanja | Uloga |
|--------|--------|
| `app.js` | Ulazna tačka — uvozi module koji pokreću simulaciju (side-effect pri importu). |
| `src/index.js` | Učitavanje JSON podataka, kreiranje početnog stanja timova. |
| `src/formsAndRanks.js` | Početna forma timova (FIBA rang + rezultati iz prijateljskih utakmica). |
| `src/SimulacijaUtakmica.js` | Verovatnoća pobede, rezultat meča, ažuriranje forme nakon utakmice. |
| `src/GrupnaFaza.js` | Grupna faza po kolima, statistika, rang u grupi. |
| `src/crtanjeTabele.js` | Formatiran ispis tabele grupe. |
| `src/Zreb.js` | Raspored rangova 1–8, šeširi D–G, ispis žreba. |
| `src/EliminacionaFaza.js` | Parovi četvrtfinala, polufinale, finale, bronza, medalje. |
| `data/groups.json` | Grupe A/B/C — timovi, ISO kodovi, FIBA rang. |
| `data/exibitions.json` | Prijateljske utakmice po timu (bonus: ulaz u kalkulaciju forme). |

## Implementacioni naglasak

- Ishod meča zavisi od **FIBA ranga** i **forme** ekipe (forma se menja tokom turnira; početak uključuje podatke iz prijateljskih mečeva).
- Eliminaciona faza koristi **nasumično mešanje** šešira uz pravila o nesastajanju timova koji su već igrali u grupi / iz iste grupe gde zadatak to zahteva.

## Razvoj i portabilnost

- Import putanje u kodu koriste `grupnaFaza.js`, dok je fajl na disku `GrupnaFaza.js`. Na OS-u sa **osetljivim veličinom slova** uskladiti ime fajla i import ili koristiti konzistentno `GrupnaFaza.js`.
