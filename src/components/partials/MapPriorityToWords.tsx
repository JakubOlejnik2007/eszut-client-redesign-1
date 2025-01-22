const MapPriorityToWords = ({ priority }: { priority: number }) => {

    const mapping = ["Wysoki", "Średni", "Niski"];

    return <>{mapping.length >= priority ? mapping[priority - 1] : undefined}</>;
}

export default MapPriorityToWords;