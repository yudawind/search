document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const resultEl = document.getElementById('result');
    let players = [];

    async function loadPlayers() {
        try {
            const resp = await fetch('players.json');
            players = await resp.json();
        } catch (err) {
            console.error('Failed to load players.json', err);
        }
    }

    loadPlayers();

    searchInput.addEventListener('input', () => {
        const raw = searchInput.value.replace(/"/g, '');
        const words = raw.split(' ').filter(Boolean);
        const negatives = [];
        const terms = [];

        for (const w of words) {
            if (w.startsWith('-')) {
                negatives.push(w.slice(1));
            } else {
                terms.push(w);
            }
        }

        if (!raw.trim()) {
            resultEl.innerHTML = '';
            return;
        }

        const items = [];
        for (const val of players) {
            const str = `${val.name} ${val.position} ${val.nationality} ${val.id} ${val.jerseyNumber} ${val.dateOfBirth} ${val.contractUntil} ${val.marketValue}`;
            if (negatives.some(n => new RegExp(n, 'i').test(str))) continue;

            let matched = true;
            for (const t of terms) {
                if (!new RegExp(t, 'i').test(str)) {
                    matched = false;
                    break;
                }
            }
            if (matched) {
                items.push(
                    `<li>
                        <h2>${val.name}</h2>
                        <p><b> id: </b>${val.id}<b> nationality: </b>${val.nationality}<b> position: </b>${val.position}<br><b>marketValue: </b>${val.marketValue}<b> id: </b>${val.id}<br><b>jerseyNumber: </b>${val.jerseyNumber}<b> dateOfBirth: </b>${val.dateOfBirth}<br><b>contractUntil: </b>${val.contractUntil}</p>
                    </li>`
                );
            }
        }

        resultEl.innerHTML = items.length ? `<ul class="my-new-list">${items.join('')}</ul>` : '';
    });
});
