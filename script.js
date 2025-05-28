document.addEventListener('DOMContentLoaded', function () {
            // --- Funcionalidad para Botones de Copiar Código ---
            const preBlocks = document.querySelectorAll('pre');
            preBlocks.forEach(pre => {
                if (pre.classList.contains('copy-button-area-processed')) {
                    return; // Skip if already processed
                }

                const codeElement = pre.querySelector('code'); 
                if (codeElement) { 
                    const scrollWrapper = document.createElement('div');
                    scrollWrapper.className = 'code-scroll-wrapper';
                    
                    scrollWrapper.appendChild(codeElement); // Moves codeElement from pre to scrollWrapper
                    
                    pre.innerHTML = ''; // Clear pre completely
                    pre.appendChild(scrollWrapper); // Add the wrapper with codeElement

                    const copyButton = document.createElement('button');
                    copyButton.className = 'copy-code-button';
                    copyButton.textContent = 'Copiar';
                    pre.appendChild(copyButton); // Append button as direct child of pre

                    copyButton.addEventListener('click', () => {
                        const codeToCopy = codeElement.innerText; 
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(codeToCopy).then(() => {
                                copyButton.textContent = '¡Copiado!';
                                copyButton.classList.add('copied');
                                setTimeout(() => {
                                    copyButton.textContent = 'Copiar';
                                    copyButton.classList.remove('copied');
                                }, 2000);
                            }).catch(err => {
                                console.warn('Fallo al copiar con navigator.clipboard:', err);
                                fallbackCopyTextToClipboard(codeToCopy, copyButton);
                            });
                        } else {
                            fallbackCopyTextToClipboard(codeToCopy, copyButton);
                        }
                    });
                    
                    pre.classList.add('copy-button-area-processed');
                }
            });

            function fallbackCopyTextToClipboard(text, buttonElement) {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                // Evitar que se vea el textarea
                textArea.style.position = 'fixed';
                textArea.style.top = '-9999px';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        buttonElement.textContent = '¡Copiado!';
                        buttonElement.classList.add('copied');
                        setTimeout(() => {
                            buttonElement.textContent = 'Copiar';
                            buttonElement.classList.remove('copied');
                        }, 2000);
                    } else {
                         console.error('Fallback: Fallo al copiar');
                         buttonElement.textContent = 'Error';
                         setTimeout(() => { buttonElement.textContent = 'Copiar'; }, 2000);
                    }
                } catch (err) {
                    console.error('Fallback: Error al copiar', err);
                    buttonElement.textContent = 'Error';
                    setTimeout(() => { buttonElement.textContent = 'Copiar'; }, 2000);
                }
                document.body.removeChild(textArea);
            }


            // --- Funcionalidad para descargar PDF ---
            // Sincronizar los selectores de orientación
            const orientationSelectTop = document.getElementById('pdf-orientation');
            const orientationSelectBottom = document.getElementById('pdf-orientation-bottom');

            orientationSelectTop.addEventListener('change', function() {
                orientationSelectBottom.value = this.value;
            });
            orientationSelectBottom.addEventListener('change', function() {
                orientationSelectTop.value = this.value;
            });


            function downloadPDF() {
                const selectedOrientation = document.getElementById('pdf-orientation').value; // Tomar el valor del selector superior (ambos están sincronizados)
                const element = document.getElementById('content');
                const opt = {
                    margin:       [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right (in inches)
                    filename:     'Tutorial_Git_GitHub.pdf',
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true, scrollY: 0 }, // Removido windowWidth y windowHeight para mejor auto-ajuste
                    jsPDF:        { unit: 'in', format: 'letter', orientation: selectedOrientation },
                    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] } 
                };
                
                const pdfControlElements = document.querySelectorAll('.button-container, .pdf-options-container');
                const copyButtons = document.querySelectorAll('.copy-code-button');
                
                pdfControlElements.forEach(el => el.style.display = 'none');
                copyButtons.forEach(btn => btn.style.display = 'none'); 
                
                html2pdf().from(element).set(opt).save().then(() => {
                     pdfControlElements.forEach(el => el.style.display = 'flex'); // Usar flex para pdf-options-container
                     // Reajustar display para button-container específicamente si es necesario (default es block via text-align: center)
                     document.querySelectorAll('.button-container').forEach(bc => bc.style.display = 'block');
                     copyButtons.forEach(btn => btn.style.display = 'block'); 
                }).catch(err => {
                    console.error("Error al generar PDF:", err);
                    pdfControlElements.forEach(el => el.style.display = 'flex');
                    document.querySelectorAll('.button-container').forEach(bc => bc.style.display = 'block');
                    copyButtons.forEach(btn => btn.style.display = 'block'); 
                });
            }
            document.getElementById('download-pdf').addEventListener('click', downloadPDF);
            document.getElementById('download-pdf-bottom').addEventListener('click', downloadPDF);


            // --- Smooth scrolling para el índice y resaltado de sección activa ---
            const tocLinks = document.querySelectorAll('#toc a');
            const sections = Array.from(document.querySelectorAll('#content section')); 

            function changeActiveLink() {
                let currentSectionId = '';
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.33) {
                        currentSectionId = section.id;
                        break;
                    }
                }
                 if (!currentSectionId && sections.length > 0) {
                    currentSectionId = sections[0].id;
                }

                tocLinks.forEach((link) => link.classList.remove('active'));
                if (currentSectionId) {
                    const activeLink = document.querySelector(`#toc a[href="#${currentSectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                        let parent = activeLink.closest('ul');
                        while(parent && parent.id !== 'toc') {
                            // Opcional: Lógica para expandir o resaltar padres
                            parent = parent.parentElement.closest('ul');
                        }
                    }
                }
            }
            
            tocLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 20; 
                         window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            window.addEventListener('scroll', changeActiveLink);
            changeActiveLink(); 


            // --- Funcionalidad para ToC colapsable en móviles ---
            const tocContainer = document.getElementById('toc-container');
            const tocTitle = tocContainer.querySelector('h2');

            function setupTocCollapsible() {
                if (window.innerWidth <= 992) {
                    tocContainer.classList.add('toc-collapsible');
                } else {
                    tocContainer.classList.remove('toc-collapsible');
                    tocContainer.classList.add('open'); 
                }
            }
            
            tocTitle.addEventListener('click', () => {
                 if (window.innerWidth <= 992) {
                    tocContainer.classList.toggle('open');
                }
            });

            window.addEventListener('resize', setupTocCollapsible);
            setupTocCollapsible(); 

        });
