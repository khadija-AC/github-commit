const axios = require('axios');

const repoOwner = 'khadija-AC';  // Remplace par le propriétaire du dépôt
const repoName = 'github-commit';  // Remplace par le nom du dépôt
let lastCommitSha = null;

async function checkForNewCommits() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`);
    const latestCommit = response.data[0];

    if (lastCommitSha && latestCommit.sha !== lastCommitSha) {
      console.log('Nouveau commit détecté :', latestCommit.commit.message);
      // Tu peux ajouter une action ici, comme lancer un script, envoyer un email, etc.
    }

    lastCommitSha = latestCommit.sha;
  } catch (error) {
    console.error('Erreur lors de la récupération des commits :', error);
  }
}

// Exécuter la vérification toutes les minutes
setInterval(checkForNewCommits, 60 * 1000);
