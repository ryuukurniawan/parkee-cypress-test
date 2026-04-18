describe('Parkee Technical Test - API Validation', () => {
    const endpoint = 'https://api.api-onepiece.com/v2/characters/en';

    it('Should validate the characters API data correctly', () => {
        cy.request(endpoint).then((response) => {
            expect(response.status).to.equal(200);
            
            const data = response.body;

            const ids = data.map(item => item.id);
            const isUnique = new Set(ids).size === ids.length;
            expect(isUnique, 'Expectation: Every character ID should be unique').to.be.true;

            data.forEach(char => {
                if (char.fruit === "Gum-Gum Fruit") {
                    expect(char.name).to.equal("Monkey D. Luffy", `Error: Fruit ${char.fruit} should belong to Monkey D. Luffy, but found on ${char.name}`);
                }
            });

            const crewBountySum = {}; 
            const totalPrimeMap = {};  

            data.forEach(char => {
              if (char && char.crew) {
                const bounty = char.bounty || 0;
                
                crewBountySum[char.crew] = (crewBountySum[char.crew] || 0) + bounty;
                
                if (char.prime !== undefined) {
                  totalPrimeMap[char.crew] = char.prime;
                }
              }
            });

            Object.keys(crewBountySum).forEach(crewName => {
              if (totalPrimeMap[crewName] !== undefined) {
                  expect(crewBountySum[crewName], `Validation for Crew: ${crewName}`)
                      .to.equal(totalPrimeMap[crewName]);
              }
            });
        });
    });
});