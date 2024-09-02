function formatString(str, length) {
    return str.padEnd(length, ' ');
}

export function drawTable(groupX, gr){
    const headers = ["Rang", "Timovi", "Bodovi", "Ppobede", "Porazi", "Dati kosevi", "Primnjeni kosevi", "Kos razlika"];

    const rows = groupX;
    const columnWidths = [3, 20, 8, 8, 8, 18, 18, 15];

    console.log("Tabela grupe "+ gr +": \n")

    const displayHeader = headers.map((header, i) => formatString(header, columnWidths[i])).join(' . ')
    console.log(displayHeader);

    const lineLength = 120;
    const line1 = '-'.repeat(lineLength);
    const line2 = "_".repeat(lineLength);
    console.log(line1);

    rows.forEach(row => {
        const displayTab = row.map((cell, i) => formatString(cell.toString(), columnWidths[i])).join(' | ')
        console.log(displayTab);
        //console.log(line1)
    });
    console.log("")
}

