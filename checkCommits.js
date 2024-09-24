const axios = require('axios');

const repoOwner = 'khadija-AC';  // Remplace par le propriétaire du dépôt
const repoName = 'github-commit';  // Remplace par le nom du dépôt
let lastCommitSha = null;

console.log('Début du suivi des commits...');  // Ajout du message de démarrage

async function checkForNewCommits() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`);
    const latestCommit = response.data[0];

    if (lastCommitSha && latestCommit.sha !== lastCommitSha) {
      console.log('Nouveau commit détecté :', latestCommit.commit.message);
    } else {
      console.log('Aucun nouveau commit.');  // Ajouter un message si pas de nouveaux commits
    }

    lastCommitSha = latestCommit.sha;
  } catch (error) {
    console.error('Erreur lors de la récupération des commits :', error);
  }
}

// Exécuter la vérification toutes les minutes
setInterval(checkForNewCommits, 60 * 1000);