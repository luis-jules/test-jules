# Interactive Git and GitHub Tutorial Webpage

## Description

This project is a single-page interactive web tutorial designed to help users learn the fundamentals of Git and GitHub. It provides comprehensive explanations, code examples, and analogies to make learning version control concepts easier.

## Key Features

*   **Comprehensive Content:** Covers essential Git and GitHub topics, from basic setup and commands to workflow patterns like branching and Pull Requests.
*   **Interactive Table of Contents (ToC):**
    *   Allows users to easily navigate to different sections of the tutorial.
    *   Highlights the currently viewed section in the ToC.
    *   Collapsible on smaller screens (tablets and mobile) for better space management.
*   **Copy-to-Clipboard:** Code examples within `<pre>` blocks have a "Copiar" (Copy) button that allows users to quickly copy the code snippets. The button provides feedback ("¡Copiado!") upon successful copy.
    *   The copy button is "sticky" and remains visible at the top-right of the code block during horizontal scrolling.
*   **PDF Download Functionality:**
    *   Users can download the entire tutorial content as a PDF document.
    *   Provides an option to choose page orientation (Portrait or Landscape) for the PDF.
*   **Responsive Design:** The layout adapts to various screen sizes, ensuring readability and usability on desktops, tablets, and mobile devices.
*   **Analogies:** Uses real-world analogies to explain complex Git concepts, making them more approachable for beginners.

## How to Use

1.  **Download the file:**
    *   Simply download the `Tutorial_Git_GitHub_V4.html` file.
    *   Alternatively, clone the entire repository if you wish to have the project locally.
2.  **Open in Browser:**
    *   Open the `Tutorial_Git_GitHub_V4.html` file in any modern web browser (e.g., Chrome, Firefox, Edge, Safari).

## Structure

The tutorial is structured to guide users progressively:

1.  **Introducción:** Basic concepts of Git and GitHub.
2.  **Empezando un Nuevo Proyecto:** Steps to initialize a project, install Git, and connect to GitHub, including authentication methods (PAT and SSH).
3.  **Flujo de Trabajo Esencial:** Covers branches, commits, and Pull Requests.
4.  **Estructura de Archivos:** Discusses recommended project structure and relative pathing.
5.  **Herramientas:** Compares using the terminal (Bash) versus IDEs for Git operations.
6.  **Otros Comandos Útiles:** Introduces additional useful Git commands.
7.  **Buenas Prácticas Adicionales:** Tips for effective version control.
8.  **Conclusión:** Encouragement to practice.

## Technology Used

*   **HTML:** For the main structure and content of the webpage.
*   **CSS:** For styling, including:
    *   Custom CSS for layout, typography, and specific component styles.
    *   **Tailwind CSS:** Utilized via CDN for utility classes (though the primary styling is custom).
*   **JavaScript:** For interactive features:
    *   Table of Contents navigation (smooth scroll, active section highlighting, collapsibility).
    *   Copy-to-clipboard functionality for code blocks.
    *   PDF generation using the `html2pdf.js` library.
*   **html2pdf.js:** A client-side JavaScript library to convert HTML content to PDF.
*   **Google Fonts:** For the 'Inter' and 'Fira Code' typefaces.
