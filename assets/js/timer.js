
function animateStatistics() {
    const statisticItems = document.querySelectorAll('.statistic-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const numberElement = entry.target.querySelector('.statistic-number');
                const targetValue = parseInt(numberElement.dataset.target);
                const prefix = numberElement.dataset.prefix || '';
                animateValue(numberElement, 0, targetValue, 2000, prefix);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    statisticItems.forEach((item) => {
        observer.observe(item);
    });
}

function animateValue(element, start, end, duration, prefix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = prefix + currentValue.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', animateStatistics);
