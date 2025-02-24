const urls = {
    client: {
        mainpage: "/",
        about: "/o-aplikacji",
        reportProblem: "/zgloszenie-usterki",
        problems: "/zgloszenia",
        archive: "/archiwum",
        account: "/konto",
        manageapp: "/zarzadzanie-aplikacja",
        displaylog: "/dziennik-log",
        settings: "/ustawienia",
        system: "/system",
        yourProblems: "/twoje-zgloszenia",
    },
    backend: {
        auth: {
            login: "/login",
            getUserRole: "/get-user-role",
            refreshToken: "/refresh-token",
            setTokens: "/set-tokens",
        },
        mails: {
            getUserMail: "/get-mail",
            insertUserMail: "/insert-mail"
        },
        problem: {
            getUnsolvedProblems: "/get-unsolved-problems",
            getUnsolvedProblemsFromEmail: "/get-unsolved-problems-from-email",
            getSolvedProblems: "/get-solved-problems",
            insertProblem: "/report-problem",
            updateProblem: "/update-problem",
            takeOnProblem: "/take-on-problem",
            takeOnProblemBulk: "/take-on-problem-bulk",
            rejectProblem: "/reject-problem",
            markProblemAsSolved: "/mark-problem-as-solved",
            markProblemAsSolvedBulk: "/mark-problem-as-solved-bulk",
            markProblemAsUnsolved: "/mark-problem-as-unsolved",
            deleteProblems: "/delete-problems"
        },
        comment: {
            insertComment: "/insert-comment",
            getComments: "/get-comments",
        },
        forms: {
            getCategories: "/get-categories",
            getPlaces: "/get-places",
            insertNewCategory: "/insert-category",
            insertNewPlace: "/insert-place",
            deleteCategory: "/delete-category",
            deletePlace: "/delete-place"
        },
        push: {
            subscribe: "/subscribe"
        },
        user: {
            changeEmail: "/change-email",
            changePassword: "/change-password",
            addNewAdministrator: "/add-new-administrator",
            deleteAdministrator: "/delete-administrator",
            getAdmins: "/get-admins"
        },
        logs: {
            getLogData: "/get-logs"
        },
        token: {
            createToken: "/create-token",
            getTokens: "/get-tokens",
            deleteToken: "/delete-token",
        }
    },
} as const;

export default urls;