(function() {
    const contactForm = document.getElementById('contactForm');
    const contactsTableBody = document.getElementById('contactsTable').querySelector('tbody');

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function renderContacts() {
        contactsTableBody.innerHTML = '';
        if (contacts.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 6;
            td.style.textAlign = 'center';
            td.textContent = 'No contacts found.';
            tr.appendChild(td);
            contactsTableBody.appendChild(tr);
            return;
        }
        contacts.forEach((contact, index) => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>${contact.address || ''}</td>
                <td>${contact.notes || ''}</td>
                <td><button class="delete-btn" data-index="${index}" aria-label="Delete contact ${contact.name}">Delete</button></td>
            `;
            contactsTableBody.appendChild(tr);
        });
    }

    function saveContacts() {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const newContact = {
            name: formData.get('name').trim(),
            phone: formData.get('phone').trim(),
            email: formData.get('email').trim(),
            address: formData.get('address').trim(),
            notes: formData.get('notes').trim()
        };

        if (!newContact.name || !newContact.phone || !newContact.email) {
            alert('Please fill in all required fields.');
            return;
        }

        contacts.push(newContact);
        saveContacts();
        renderContacts();
        contactForm.reset();
    });

    contactsTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            if (index !== null) {
                if (confirm('Are you sure you want to delete this contact?')) {
                    contacts.splice(index, 1);
                    saveContacts();
                    renderContacts();
                }
            }
        }
    });

    renderContacts();
})();
