document.addEventListener("DOMContentLoaded", () => {
    // Array of skills
    const skills = ["JavaScript", "HTML", "CSS"];

    // Dynamically generate the skills list
    const skillsList = document.getElementById("skillsList");
    skills.forEach(skill => {
        const listItem = document.createElement("li");
        listItem.textContent = skill;
        skillsList.appendChild(listItem);
    });

    // Fetch GitHub projects using API
    fetch("https://api.github.com/users/mamooredesigns/repos")
        .then(response => response.json())
        .then(data => {
            const projectsList = document.getElementById("projectsList");
            data.forEach(project => {
                const projectItem = document.createElement("li");
                projectItem.innerHTML = `<a href="${project.html_url}" target="_blank">${project.name}</a>`;
                projectsList.appendChild(projectItem);
            });
        })
        .catch(error => console.error("Error fetching GitHub projects:", error));

    // Handle contact form submission
    const contactForm = document.getElementById("contactForm");
    const messagesList = document.getElementById("messagesList");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Create a new message item
        const messageItem = document.createElement("li");
        messageItem.innerHTML = `
            <a href="mailto:${email}" title="Email: ${email}">${name}</a>: 
            <p>${message}</p>
            <button class="editBtn">Edit</button>
            <button class="removeBtn">Remove</button>
        `;

        // Append the new message to the messages list
        messagesList.appendChild(messageItem);

        // Clear form fields
        contactForm.reset();

        // Add event listeners for edit and remove buttons
        const editButton = messageItem.querySelector(".editBtn");
        const removeButton = messageItem.querySelector(".removeBtn");

        editButton.addEventListener("click", () => {
            document.getElementById("name").value = name;
            document.getElementById("email").value = email;
            document.getElementById("message").value = message;
            messageItem.remove();
        });

        removeButton.addEventListener("click", () => {
            messageItem.remove();
        });
    });
});
