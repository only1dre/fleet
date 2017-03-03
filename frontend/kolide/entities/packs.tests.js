import expect from 'expect';
import nock from 'nock';

import Kolide from 'kolide';
import mocks from 'test/mocks';
import { hostStub, packStub } from 'test/stubs';

const { packs: packMocks } = mocks;

describe('Kolide - API client (packs)', () => {
  afterEach(() => {
    nock.cleanAll();
    Kolide.setBearerToken(null);
  });

  const bearerToken = 'valid-bearer-token';

  describe('#addLabel', () => {
    it('calls the correct endpoint with the correct parameters', () => {
      const packID = 10;
      const labelID = 20;
      const request = packMocks.addLabel.valid(bearerToken, packID, labelID);

      Kolide.setBearerToken(bearerToken);
      return Kolide.packs.addLabel({ packID, labelID })
        .then(() => {
          expect(request.isDone()).toEqual(true);
        });
    });
  });

  describe('#addQuery', () => {
    it('calls the correct endpoint with the correct parameters', () => {
      const packID = 10;
      const queryID = 20;
      const request = packMocks.addQuery.valid(bearerToken, packID, queryID);

      Kolide.setBearerToken(bearerToken);
      return Kolide.packs.addQuery({ packID, queryID })
        .then(() => {
          expect(request.isDone()).toEqual(true);
        });
    });
  });

  describe('#create', () => {
    it('calls the correct endpoint with the correct parameters', () => {
      const { description, name } = packStub;
      const params = { description, name, host_ids: [], label_ids: [] };
      const request = packMocks.create.valid(bearerToken, params);

      Kolide.setBearerToken(bearerToken);

      return Kolide.packs.create(params)
        .then(() => {
          expect(request.isDone()).toEqual(true);
        });
    });
  });

  describe('#destroy', () => {
    it('calls the correct endpoint with the correct parameters', () => {
      const request = packMocks.destroy.valid(bearerToken, packStub);

      Kolide.setBearerToken(bearerToken);
      return Kolide.packs.destroy(packStub)
        .then(() => {
          expect(request.isDone()).toEqual(true);
        });
    });
  });

  describe('#load', () => {
  });

  describe('#loadAll', () => {
  });

  describe('#update', () => {
    it('sends the host and/or label ids if packs are changed', () => {
      const targets = [hostStub];
      const updatePackParams = { name: 'New Pack Name', host_ids: [hostStub.id] };
      const request = packMocks.update.valid(bearerToken, packStub, updatePackParams);
      const updatedPack = { name: 'New Pack Name', targets };

      Kolide.setBearerToken(bearerToken);
      return Kolide.packs.update(packStub, updatedPack)
        .then(() => {
          expect(request.isDone()).toEqual(true);
        });
    });

    it('does not send the host or label ids if packs are not changed', () => {
      const updatePackParams = { name: 'New Pack Name' };
      const request = packMocks.update.valid(bearerToken, packStub, updatePackParams);

      Kolide.setBearerToken(bearerToken);
      return Kolide.packs.update(packStub, updatePackParams)
        .then(() => {
          expect(request.isDone()).toEqual(true);
        });
    });
  });
});