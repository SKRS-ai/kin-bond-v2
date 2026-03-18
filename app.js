/* PROPERTY OF SOLOMON KIN LLC - PATENT PENDING (2026)
   CORE ENGINE: BOND GENERATION & SESSION MANAGEMENT
*/

const SK_APP = {
    // 1. Core Configuration
    config: {
        company: "Solomon Kin LLC",
        year: 2026,
        prefix: "SK-BOND-",
        ledgerStatus: "ACTIVE"
    },

    // 2. Bond ID Generator (Logic for Unique Serial Numbers)
    generateBondID: function(p1, p2) {
        const timestamp = Date.now().toString(36).toUpperCase();
        const hash = btoa(p1 + p2).substring(0, 4).toUpperCase();
        return `${this.config.prefix}${hash}-${timestamp}`;
    },

    // 3. Session Management (Pseudo-Login Logic)
    initSession: function() {
        const user = localStorage.getItem('sk_member');
        if (user) {
            const display = document.getElementById('user-display');
            if (display) display.innerText = `@${user}`;
            // If on index, hide the "Join Free" button and show "Go to Vault"
            const joinBtn = document.querySelector('.btn-member');
            if (joinBtn) joinBtn.innerText = "Enter Vault";
        }
    },

    // 4. Persistence (Saving the Draft Bond)
    saveDraftBond: function() {
        const p1 = document.getElementById('p1-name').value;
        const p2 = document.getElementById('p2-name').value;
        const t1 = document.getElementById('p1-type').value;
        const t2 = document.getElementById('p2-type').value;

        if (p1 && p2) {
            const draft = {
                id: this.generateBondID(p1, p2),
                partner1: p1,
                partner2: p2,
                type1: t1,
                type2: t2,
                date: new Date().toLocaleDateString(),
                status: "PENDING_PAYMENT"
            };
            localStorage.setItem('current_draft', JSON.stringify(draft));
            window.location.href = "buy-unity.html";
        } else {
            alert("Please provide both partner names to initialize the Bond.");
        }
    },

    // 5. Ledger Update (Post-Payment Success)
    finalizeBond: function() {
        const draft = JSON.parse(localStorage.getItem('current_draft'));
        if (draft) {
            draft.status = "ACTIVE";
            localStorage.setItem('active_bond', JSON.stringify(draft));
            alert("Bond Successfully Sealed in the Solomon Kin Ledger.");
            window.location.href = "dashboard.html";
        }
    }
};

// Initialize App on Page Load
document.addEventListener('DOMContentLoaded', () => {
    SK_APP.initSession();
});