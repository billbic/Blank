class ErrorHandler {

    static isDevelopment = false;
    static dialogId = "globalErrorDialog";

    /**
     * Initialize once at app startup
     */
    static init(isDevelopment = false) {
        this.isDevelopment = isDevelopment;
        this._ensureDialog();
    }

    /**
     * Main entry point
     */
    static handle(error, context = "") {

        console.error("Error caught:", error);

        const message = this.isDevelopment
            ? this._buildDevMessage(error, context)
            : this._buildProdMessage();

        this._showDialog(message);
    }

    /**
     * Dev-friendly detailed message
     */
    static _buildDevMessage(error, context) {
        let msg = `<strong>Unexpected Error</strong><br/>`;

        if (context) {
            msg += `<br/><em>Context:</em> ${context}<br/>`;
        }

        if (error) {
            msg += `<br/><em>Message:</em> ${error.message || error}<br/>`;

            if (error.stack) {
                msg += `<br/><details>
                            <summary>Stack Trace</summary>
                            <pre>${error.stack}</pre>
                        </details>`;
            }
        }

        return msg;
    }

    /**
     * Production-safe message
     */
    static _buildProdMessage() {
        return `
            <strong>Something went wrong</strong><br/><br/>
            Please try again. If the issue persists, contact support.
        `;
    }

    /**
     * Create dialog if missing
     */
    static _ensureDialog() {

        if ($("#" + this.dialogId).length) return;

        $("body").append(`
            <div id="${this.dialogId}" title="Error" style="display:none;"></div>
        `);

        $("#" + this.dialogId).dialog({
            autoOpen: false,
            modal: true,
            width: 500,
            buttons: {
                "Close": function () {
                    $(this).dialog("close");
                }
            }
        });
    }

    /**
     * Show dialog
     */
    static _showDialog(html) {
        $("#" + this.dialogId).html(html);
        $("#" + this.dialogId).dialog("open");
    }
}