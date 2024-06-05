import { test } from '@playwright/test';
import { connecter, creerAgent, modifierCredit, creerdemande, envoyerMessage, seDeconnecter, supprimer, supprimerDemande} from './utils';

    test('Tout essayer', async ({ page }) => {
        const identifiant = 'Utilisateur-' + Date.now();
        await connecter(page);
        await creerAgent(page,identifiant);
        await modifierCredit(page, identifiant);
        await creerdemande(page, identifiant);
        await envoyerMessage(page, identifiant);
        await supprimerDemande(page, identifiant);
        await supprimer(page, identifiant);
        await seDeconnecter(page);
    });

    test('Se connecter', async ({ page }) => {
        await connecter(page);
    });
    
    test('Créer un agent', async ({ page }) => {
        const identifiant = 'Utilisateur-' + Date.now();
        await connecter(page);
        await creerAgent(page, identifiant);
        await supprimer(page, identifiant);
    });
    
    test('Modifier le crédit du nouvel agent', async ({ page }) => {
        const identifiant = 'Utilisateur-' + Date.now();
        await connecter(page);
        await creerAgent(page, identifiant);
        await modifierCredit(page, identifiant);
        await supprimer(page, identifiant);
    });
    
    test('Créer une demande', async ({ page }) => {
        const identifiant = 'Utilisateur-' + Date.now();
        await connecter(page);
        await creerAgent(page, identifiant);
        await creerdemande(page, identifiant);
        await supprimerDemande(page, identifiant);
        await supprimer(page, identifiant);
    });
    
    test('Envoyer un message', async ({ page }) => {
        const identifiant = 'Utilisateur-' + Date.now();
        await connecter(page);
        await creerAgent(page, identifiant);
        await envoyerMessage(page, identifiant);
        await supprimer(page, identifiant);
    });
    
    test('Se déconnecter', async ({ page }) => {
        await connecter(page);
        await seDeconnecter(page);
    });
    
    test('Supprimer un agent', async ({ page }) => {
        const identifiant = 'Utilisateur-' + Date.now();
        await connecter(page);
        await creerAgent(page, identifiant);
        await supprimer(page, identifiant);
    });