import petId from '../fixtures/petId.json';

context("Pet APIs Tests", () => {
  const createPetId = petId.createPetId;
  const getPetId = petId.getPetId;
  const deletePetId = petId.deletePetId;

  it('should create a pet', () => {
    const newPet = {
      id: createPetId,
      name: 'Fluffy',
      status: 'available'
    };

    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      body: newPet
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('name', 'Fluffy');
    });
  });

  it('should update pet information via API', () => {
  
    cy.request({
      method: 'PUT',
      url: `https://petstore.swagger.io/v2/pet`,
      body: {
        name: 'updatedDoggie',
        status: 'updatedAvailable'
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.eq('updatedDoggie');
      expect(response.body.status).to.equal('updatedAvailable')
    });
  });

  it('should return pet information for a specific ID', () => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/pet/${getPetId}`
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(getPetId);
    });
  });

  it('should delete the pet created', () => {
    cy.request('DELETE', `https://petstore.swagger.io/v2/pet/${deletePetId}`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
  
});
