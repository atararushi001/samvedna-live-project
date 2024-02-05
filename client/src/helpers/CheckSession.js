const checkRecruiterSession =  async () => {
    const response = await fetch('http://localhost/MySamvedna/api/utils/checkRecruiterSession.php', {
        method: 'GET',
    });

    const body = await response.json();

    if (response.status !== 200) {
        throw Error(body.message);
    }

    return body;
}

export default checkRecruiterSession;