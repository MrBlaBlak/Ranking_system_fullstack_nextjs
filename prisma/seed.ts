import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const gamersData = [
    { id: "17", lastTen: "1101011000", mmr: 568.4, name: "Naicrez", server: "EU2" },
    { id: "7", lastTen: "110001", mmr: 606.5, name: "Elytic", server: "EU2" },
    { id: "18", lastTen: "1111111111", mmr: 611.2, name: "Toxic", server: "EU3" },
    { id: "19", lastTen: "110001", mmr: 577.9, name: "Eppixx", server: "EU1" },
    { id: "4", lastTen: "1100011111", mmr: 618.2, name: "Foy", server: "NY2" },
    { id: "6", lastTen: "1111111101", mmr: 580.8, name: "Squishy", server: "EU1" },
    { id: "29", lastTen: "1100111001", mmr: 577.1, name: "Skitts", server: "EU1" },
    { id: "20", lastTen: "1100111001", mmr: 591.7, name: "Cylas", server: "EU1" },
    { id: "9", lastTen: "111110111", mmr: 636.8, name: "Haboo", server: "NY4" },
    { id: "28", lastTen: "11111111", mmr: 580.3, name: "Lightman", server: "NY1" },
    { id: "5", lastTen: "1100111111", mmr: 638.9, name: "Timo", server: "EU2" },
    { id: "10", lastTen: "1000000111", mmr: 591.8, name: "Diddy", server: "NY5" },
    { id: "21", lastTen: "11111111", mmr: 564.6, server: "NY5", name: "Slime" },
    { id: "24", lastTen: "0", mmr: 585.9, name: "Ronin", server: "EU1" },
    { id: "14", lastTen: "111110110", mmr: 620.7, name: "Bobby", server: "NY4" },
    { id: "34", lastTen: "1111111", mmr: 582.3, name: "Dragon", server: "NY5" },
    { id: "25", lastTen: "11111111", mmr: 604.0, name: "Mitter", server: "EU2" },
    { id: "16", lastTen: "1100101110", mmr: 594.0, name: "Zto", server: "NY1" },
    { id: "2", lastTen: "10000001", mmr: 595.1, name: "Stn", server: "NY1" },
    { id: "27", lastTen: "10000000", mmr: 578.9, name: "Tark", server: "NY6" },
    { id: "30", lastTen: "1100011000", mmr: 523.6, name: "Hero", server: "EU1" },
    { id: "1", lastTen: "11111110", mmr: 595.7, name: "Suddi", server: "EU1" },
    { id: "13", lastTen: "1110000011", mmr: 619.2, name: "Zim", server: "NY5" },
    { id: "31", lastTen: "11001010", mmr: 569.5, name: "Noface", server: "NY1" },
    { id: "12", lastTen: "1100000111", mmr: 561.5, name: "M-kon", server: "EU2" },
    { id: "33", lastTen: "11111011", mmr: 561.1, name: "Ruski", server: "NY1" },
    { id: "32", lastTen: "1100011", mmr: 568.6, name: "Daire", server: "EU3" },
    { id: "3", lastTen: "1110110010", mmr: 589.0, name: "Zery", server: "EU2" },
    { id: "23", lastTen: "1001110000", mmr: 554.9, name: "Alex", server: "EU2" },
    { id: "11", lastTen: "1101111110", mmr: 612.0, name: "Grim", server: "NY6" },
    { id: "26", lastTen: "11001110", mmr: 573.1, name: "Titan", server: "NY3" },
    { id: "22", lastTen: "1111001110", mmr: 593.3, name: "Sora", server: "NY1" },
    { id: "8", lastTen: "11011001", mmr: 599.0, name: "Becket", server: "EU3" },
    { id: "15", lastTen: "10011000", mmr: 578.2, name: "Blak", server: "EU2" }
]

async function main() {
    console.log('Ładowanie graczy do bazy...')
    for (const g of gamersData) {
        await prisma.gamer.create({
            data: g
        })
    }
    console.log('Gotowe! Załadowano ' + gamersData.length + ' graczy.')
}

main()
    .catch((e) => { console.error(e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })