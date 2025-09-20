document.addEventListener('DOMContentLoaded', () => {
    const photoUpload = document.getElementById('photoUpload');
    const fileNameSpan = document.getElementById('fileName');
    const chipCanvas = document.getElementById('chipCanvas');
    const ctx = chipCanvas.getContext('2d');
    const downloadChipBtn = document.getElementById('downloadChip');
    const instructionText = document.querySelector('.canvas-container .instruction');
    const userNameInput = document.getElementById('userName'); // Get the new input

    const CHIP_SIZE = 400;
    chipCanvas.width = CHIP_SIZE;
    chipCanvas.height = CHIP_SIZE;

    const millionaireLogo = new Image();
    millionaireLogo.src = './assets/MWM-logo.png';
    millionaireLogo.onload = () => {
        // Redraw the chip if a photo is already uploaded and the logo loads
        if (photoUpload.files.length > 0) {
            const file = photoUpload.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => drawChip(img, userNameInput.value); // Pass name
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    millionaireLogo.onerror = () => {
        console.error("Error loading millionaire_logo.png. Make sure the file exists and the path is correct.");
    };

    // Function to trigger drawing if both photo and name exist
    function updateChipDisplay() {
        const file = photoUpload.files[0];
        const userName = userNameInput.value.trim(); // Get trimmed name
        if (file && userName) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    drawChip(img, userName); // Pass name to draw function
                    downloadChipBtn.disabled = false;
                    downloadChipBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    downloadChipBtn.classList.add('pulse-button');
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            // Clear canvas if conditions aren't met
            ctx.clearRect(0, 0, CHIP_SIZE, CHIP_SIZE);
            instructionText.style.display = 'block';
            downloadChipBtn.disabled = true;
            downloadChipBtn.classList.add('opacity-50', 'cursor-not-allowed');
            downloadChipBtn.classList.remove('pulse-button');
        }
    }


    photoUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            fileNameSpan.textContent = file.name;
            instructionText.style.display = 'none';
        } else {
            fileNameSpan.textContent = 'No file chosen';
        }
        updateChipDisplay(); // Call update function
    });

    userNameInput.addEventListener('input', () => { // Listen for input changes
        const userName = userNameInput.value.trim();
        if (userName.length > 0 && photoUpload.files.length > 0) {
            updateChipDisplay(); // Redraw with new name
        } else {
            // Clear or reset if name is removed
            ctx.clearRect(0, 0, CHIP_SIZE, CHIP_SIZE);
            instructionText.style.display = 'block';
            downloadChipBtn.disabled = true;
            downloadChipBtn.classList.add('opacity-50', 'cursor-not-allowed');
            downloadChipBtn.classList.remove('pulse-button');
        }
    });

    // Modify drawChip to accept userName
    function drawChip(userImage, userName) {
        ctx.clearRect(0, 0, CHIP_SIZE, CHIP_SIZE);

        const centerX = CHIP_SIZE / 2;
        const centerY = CHIP_SIZE / 2;
        const radius = CHIP_SIZE / 2 - 10;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.fillStyle = '#C0392B';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.closePath();

        const faceRadius = radius * 0.7;
        const faceX = centerX - faceRadius;
        const faceY = centerY - faceRadius;
        const faceDiameter = faceRadius * 2;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, faceRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const imgAspectRatio = userImage.width / userImage.height;
        const canvasAspectRatio = faceDiameter / faceDiameter;

        let sx, sy, sWidth, sHeight;
        let dx, dy, dWidth, dHeight;

        if (imgAspectRatio > canvasAspectRatio) {
            sHeight = userImage.height;
            sWidth = sHeight * canvasAspectRatio;
            sx = (userImage.width - sWidth) / 2;
            sy = 0;
        } else {
            sWidth = userImage.width;
            sHeight = sWidth / canvasAspectRatio;
            sx = 0;
            sy = (userImage.height - sHeight) / 2;
        }

        dx = faceX;
        dy = faceY;
        dWidth = faceDiameter;
        dHeight = faceDiameter;

        ctx.drawImage(userImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.restore();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = '#FDD835';
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2, true);
        ctx.strokeStyle = '#FFEB3B';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();

        // Custom user name text
        const displayUserName = userName.toUpperCase(); // Ensure uppercase for consistency
        const betOnText = "BET ON";
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Adjust font size dynamically or set a fixed size
        let fontSize = 30;
        ctx.font = `bold ${fontSize}px Impact, sans-serif`;

        // Measure text to potentially wrap or reduce size
        const betOnTextWidth = ctx.measureText(betOnText).width;
        const userNameTextWidth = ctx.measureText(displayUserName).width;

        const maxTextWidth = radius * 1.5; // Allow text to be wider than the face

        // If the combined text is too long, reduce font size
        if ((betOnTextWidth + userNameTextWidth) > maxTextWidth) {
            fontSize = 25; // Smaller font
            ctx.font = `bold ${fontSize}px Impact, sans-serif`;
        }

        // Position "BET ON" slightly above the user name
        ctx.fillText(betOnText, centerX, centerY - faceRadius - 45); // Higher up
        ctx.fillText(displayUserName, centerX, centerY - faceRadius - 15); // Closer to face

        // Millionaire Logo
        if (millionaireLogo.complete && millionaireLogo.naturalHeight !== 0) {
            const logoMaxWidth = radius * 1.5;
            const logoMaxHeight = CHIP_SIZE - (centerY + faceRadius + 10) - 20;

            let logoWidth = millionaireLogo.width;
            let logoHeight = millionaireLogo.height;

            if (logoWidth > logoMaxWidth) {
                logoHeight = (logoMaxWidth / logoWidth) * logoHeight;
                logoWidth = logoMaxWidth;
            }
            if (logoHeight > logoMaxHeight) {
                logoWidth = (logoMaxHeight / logoHeight) * logoWidth;
                logoHeight = logoMaxHeight;
            }

            const logoX = centerX - (logoWidth / 2);
            const logoY = centerY + faceRadius + 10;

            ctx.drawImage(millionaireLogo, logoX, logoY, logoWidth, logoHeight);
        } else {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 20px Arial, sans-serif';
            ctx.fillText('MILLIONAIRE', centerX, centerY + faceRadius + 30);
        }

        ctx.fillStyle = '#FFEB3B';
        drawStar(ctx, centerX + radius * 0.85, centerY, 5, 8, 4);
        drawStar(ctx, centerX - radius * 0.85, centerY, 5, 8, 4);
        drawStar(ctx, centerX, centerY + radius * 0.85, 5, 8, 4);
        drawStar(ctx, centerX, centerY - radius * 0.85, 5, 8, 4);
    }

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }

    downloadChipBtn.addEventListener('click', () => {
        if (downloadChipBtn.disabled) return;
        
        try {
            const dataURL = chipCanvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = dataURL;
            const userName = userNameInput.value.trim() || 'YourName';
            const sanitizedName = userName.toLowerCase().replace(/[^a-z0-9]/g, '-');
            a.download = `bet-on-${sanitizedName}-mwm-chip.png`;
            
            // Add some visual feedback
            downloadChipBtn.textContent = 'DOWNLOADING...';
            downloadChipBtn.disabled = true;
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Reset button after download
            setTimeout(() => {
                downloadChipBtn.textContent = 'DOWNLOAD MY CHIP';
                downloadChipBtn.disabled = false;
                downloadChipBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                downloadChipBtn.classList.add('pulse-button');
            }, 1000);
            
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
        }
    });

    // Initial clear/setup of canvas
    ctx.clearRect(0, 0, CHIP_SIZE, CHIP_SIZE);
    instructionText.style.display = 'block';
    downloadChipBtn.disabled = true;
    downloadChipBtn.classList.add('opacity-50', 'cursor-not-allowed');
    downloadChipBtn.classList.remove('pulse-button');
});