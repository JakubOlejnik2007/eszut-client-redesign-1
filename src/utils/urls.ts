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
        settings: "/ustawienia"
    },
    backend: {
        auth: {
            login: "/login",
            getUserRole: "/get-user-role"
        },
        problem: {
            getUnsolvedProblems: "/get-unsolved-problems",
            getSolvedProblems: "/get-solved-problems",
            insertProblem: "/report-problem",
            updateProblem: "/update-problem",
            takeOnProblem: "/take-on-problem",
            rejectProblem: "/reject-problem",
            markProblemAsSolved: "/mark-problem-as-solved",
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
    },
} as const;

export default urls;