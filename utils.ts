import { Page, expect } from '@playwright/test';


    //SE CONNECTER
    export async function connecter(page: Page) {
        const login = "monlogin"
        const password = "mon password"
        await page.goto('https://tao-admin-develop.qual.skazy.cloud/login');
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/login');
        await page.getByLabel('Votre login').fill(login);
        await page.getByLabel('Votre mot de passe').fill(password);
        await page.getByRole('button', {name : 'Se connecter'}).click();
        expect(page.locator('input#SelectComp_selectTenant')).toBeVisible();
        await page.locator('input#SelectComp_selectTenant').fill("Mairie de Puna'auia");
        await page.keyboard.press('Enter');
    };

    // CRÉER UN AGENT
    export async function creerAgent(page: Page, identifiant: string) {
        expect(page.locator('li#menu--agents div#menu--agents')).toBeVisible();
        await page.locator('li#menu--agents div#menu--agents').click();
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/agents');
        expect(page.locator('#Button_noStore_onAddOrOpenModalToEdit')).toBeVisible();
        await page.locator('#Button_noStore_onAddOrOpenModalToEdit').click();
        expect(page.getByText('Identifiant de connexion. Doit être unique.')).toBeVisible();
        await page.getByLabel('Matricule').nth(1).fill(identifiant);
        await page.getByLabel('Nom').nth(3).fill('Nom');
        await page.getByLabel('Prénom').last().fill('Prenom');
        await page.locator('div.ant-picker-input input').click();
        await page.locator('div.ant-picker-header-view button.ant-picker-year-btn').click();
        await page.locator('div.ant-picker-header button.ant-picker-header-super-prev-btn').dblclick({delay : 100});
        await page.getByTitle('2006').click();
        await page.getByTitle('2006-02').click();
        await page.getByTitle('2006-02-03').click();
        await page.getByLabel('Email').fill('nom.prenom@gmail.com');
        await page.getByLabel('Téléphone').last().fill('89536060');
        await page.getByLabel('Code banque').fill('CODE B');
        await page.getByLabel('Code guichet').fill('CODE G');
        await page.getByLabel('Numéro de compte').fill('Num C');
        await page.getByLabel('Clé RIB').fill('Clé RIB');
        await page.getByLabel('Statut').last().fill('Fonctionnaire Stagiaire');
        await page.keyboard.press('Enter');
        await page.getByLabel('Rattachement budget').fill('Budget Principal');
        await page.keyboard.press('Enter');
        await page.getByLabel("Nombre d'enfant").fill('0');
        await page.locator('#Button_USER_modalSubmit').click();
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/agents?tab=credit-list');
        expect(page.locator('#Button_USER_addNewCredit')).toBeVisible();
        await page.locator('#Button_USER_addNewCredit').click();
        expect(page.locator('div.ant-picker-input')).toBeVisible();
        await page.locator('div.ant-picker-input').click();
        await page.getByTitle('2023').click();
        await page.getByLabel('Crédit annuel').fill('25000');
        await page.locator('#Button_CREDIT_modalSubmit').click();
        expect(page.locator('#Button_USER_modalSubmit')).toBeVisible();
        await page.locator('#Button_USER_modalSubmit').click();
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/agents?tab=employment-contract-list');
        await page.locator('#Button_USER_addNewContract').click();
        expect(page.locator('#undefined_startDate')).toBeVisible();
        await page.locator('#undefined_startDate').click();
        await page.locator('div.ant-picker-footer a.ant-picker-now-btn').click();
        expect(page.locator('#undefined_endDate')).toBeVisible();
        await page.locator('#undefined_endDate').click();

        const maxAttempts = 100; // Nombre maximal de tentatives
        let attempts = 0; // Nombre de tentatives
        // Boucle pour cliquer jusqu'à trouver la date ou jusqu'à atteindre le nombre maximal de tentatives
        while (attempts < maxAttempts) {
            // Clique sur le bouton pour avancer le calendrier
            await page.locator('button.ant-picker-header-next-btn').last().click();
            if (await page.getByTitle('2025-09-27').isVisible()) {
                // Si la date est visible, clique dessus et sort de la boucle
                await page.getByTitle('2025-09-27').click();
                break;
            }
    
            attempts++; // Incrémente le nombre de tentatives
        }
        // Si la date n'a pas été trouvée après le nombre maximal de tentatives
        if (attempts === maxAttempts) {
            console.log("La date n'a pas été trouvée après " + maxAttempts + " tentatives.");
            // Autres actions à prendre en cas d'échec de la recherche de la date
        }

        expect(page.getByText('Ce contrat a été enregistré')).toBeVisible();
        expect(page.locator('#Button_CONTRACT_modalSubmit')).toBeVisible();
        await page.locator('#Button_CONTRACT_modalSubmit').click();
        expect(page.locator('#Button_USER_modalSubmit')).toBeVisible();
        await page.locator('#Button_USER_modalSubmit').click();
    };

    // MODIFIER LE CRÉDIT DU NOUVEL AGENT
    export async function modifierCredit(page: Page, identifiant: string) {
        expect(page.locator('li#menu--agents div#menu--agents')).toBeVisible();
        await page.locator('li#menu--agents div#menu--agents').click();
        expect(page.locator('input#Text_store-USER_filter-FilterText_property-search')).toBeVisible();
        await page.waitForTimeout(1000);
        await page.locator('input#Text_store-USER_filter-FilterText_property-search').fill(identifiant);
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
        expect(page.getByText('1 résultat')).toBeVisible();
        await page.waitForTimeout(1000);
        await page.locator('#Button_USER_rowEdit0').click();
        expect(page.locator('#USER-tab-credit-list')).toBeVisible();
        await page.locator('#USER-tab-credit-list').click();
        expect(page.locator('#Button_CREDIT_rowDelete0')).toBeVisible();
        await page.locator('#Button_CREDIT_rowDelete0').click();
        expect(page.locator('#ConfirmDelete')).toBeVisible();
        await page.locator('#ConfirmDelete').click();
        expect(page.getByText('Vous devez créer un crédit pour cet agent.')).toBeVisible();
        await page.locator('#Button_USER_addNewCredit').click();
        expect(page.locator('div.ant-picker-input')).toBeVisible();
        await page.locator('div.ant-picker-input').click();
        await page.getByTitle('2024').click();
        await page.getByLabel('Crédit annuel').last().fill('250000');
        await page.locator('#Button_CREDIT_modalSubmit').click();
        expect(page.getByText('Ce crédit a été enregistré')).toBeVisible();
    };

    // CRÉER UNE DEMANDE
    export async function creerdemande(page: Page, identifiant: string) {
        expect(page.locator('li#menu--demandes div#menu--demandes')).toBeVisible();
        await page.locator('li#menu--demandes div#menu--demandes').click();
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/demandes');
        expect(page.locator('#Button_noStore_onAddOrOpenModalToEdit')).toBeVisible();
        await page.locator('#Button_noStore_onAddOrOpenModalToEdit').click();
        expect(page.getByLabel('Agent')).toBeVisible();
        await page.getByLabel('Agent').fill(identifiant);
        expect(page.getByTitle('Prenom Nom'));
        await page.waitForTimeout(1000);
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
        await page.getByLabel('Pourcentage de remboursement demandé').fill('55');
        await page.getByLabel('Montant de la facture').fill('200000');
        await page.locator('div.ant-picker-input input').last().click();
        await page.locator('div.ant-picker-footer ul.ant-picker-ranges a.ant-picker-now-btn').click();
        await page.getByLabel('Numéro de la facture').fill('Num Fact');
        await page.getByLabel('Domaine').last().fill('Restauration');
        await page.keyboard.press('Enter');
        await page.getByLabel('Prestation').fill('Remboursement des repas pris ou commandés dans un établissement de restauration');
        await page.keyboard.press('Enter');
        expect(page.locator('#Button_REFUND-REQUEST_modalSubmit')).toBeVisible();
        await page.locator('#Button_REFUND-REQUEST_modalSubmit').click();
        expect(page.locator('#Button_REFUND-REQUEST_modalSubmit')).toBeVisible();
        await page.locator('#Button_REFUND-REQUEST_modalSubmit').click();        
    };

    // ENVOYER UN MESSAGE
    export async function envoyerMessage(page: Page, identifiant: string) {
        expect(page.locator('li#menu--messagerie div#menu--messagerie')).toBeVisible();
        await page.locator('li#menu--messagerie div#menu--messagerie').click();
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/messagerie');
        expect(page.locator('button#Button_noStore_onAddOrOpenModalToEdit')).toBeVisible();
        await page.locator('button#Button_noStore_onAddOrOpenModalToEdit').click();
        expect(page.getByLabel('Agent')).toBeVisible();
        await page.getByLabel('Agent').fill(identifiant);
        expect(page.getByTitle('Prenom Nom'));
        await page.waitForTimeout(1000);
        await page.waitForTimeout(1000);
        await page.keyboard.press('Enter');
        await page.locator('input#Text_MESSAGE-BOX_').fill('Message envoyé avec succès');
        await page.locator('button#Button_MESSAGE-BOX_sendNewMessage').click();
    };

    // SE DÉCONNECTER
    export async function seDeconnecter(page: Page) {
        expect(page.locator('button#Button_noStore_logout')).toBeVisible();
        await page.locator('button#Button_noStore_logout').click();
    };


    //SUPPRIMER UN AGENT
    export async function supprimer(page: Page, identifiant: string) {
        expect(page.locator('li#menu--agents div#menu--agents')).toBeVisible();
        await page.locator('li#menu--agents div#menu--agents').click();
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/agents');
        expect(page.locator('input#Text_store-USER_filter-FilterText_property-search')).toBeVisible();
        await page.locator('input#Text_store-USER_filter-FilterText_property-search').fill(identifiant);
        await page.keyboard.press('Enter');
        expect(page.getByText('1 résultat')).toBeVisible();
        await page.waitForTimeout(1000);
        expect(page.locator('#Button_USER_openMoreRow0')).toBeVisible();
        await page.locator('#Button_USER_openMoreRow0').click();
        await page.locator('#Button_USER_rowDelete0').click();
        expect(page.locator('#ConfirmDelete')).toBeVisible();
        await page.locator('#ConfirmDelete').click();
    };

    //SUPPRIMER UNe DEMANDE
    export async function supprimerDemande(page: Page, identifiant: string) {
        expect(page.locator('li#menu--demandes div#menu--demandes')).toBeVisible();
        await page.locator('li#menu--demandes div#menu--demandes').click();
        await page.waitForURL('https://tao-admin-develop.qual.skazy.cloud/demandes');
        expect(page.locator('input#Text_store-REFUND-REQUEST_filter-FilterText_property-search')).toBeVisible();
        await page.locator('input#Text_store-REFUND-REQUEST_filter-FilterText_property-search').fill(identifiant);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000);
        expect(page.getByText('1 résultat')).toBeVisible();
        expect(page.locator('#Button_REFUND-REQUEST_rowDelete0')).toBeVisible();
        await page.locator('#Button_REFUND-REQUEST_rowDelete0').click();
        expect(page.locator('#ConfirmDelete')).toBeVisible();
        await page.locator('#ConfirmDelete').click();
    };
