const ejs = require('ejs');
const path = require('path');

// Function to render with layout
function renderWithLayout(view, locals) {
    const layoutPath = path.join(__dirname, '../views/layout.ejs');
    const viewPath = path.join(__dirname, '../views', view + '.ejs');

    return ejs.renderFile(layoutPath, {
        title: locals.title || 'Default Title',
        user: locals.user || null,
        body: ejs.renderFile(viewPath, locals)
    });
}

module.exports = { renderWithLayout };
