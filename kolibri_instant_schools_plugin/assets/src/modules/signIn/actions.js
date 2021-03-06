import { httpClient } from 'kolibri.client';
import template from 'rest/interceptor/template';
import urls from 'kolibri.urls';
import { PageNames } from '../../constants';

export function showSelectProfilePage(store, params) {
  const { phone, password, facility } = params;
  return httpClient
    .wrap(template)({
      path: `${urls['kolibri:user:phoneaccountprofile_list']()}{?password}{&phone}`,
      method: 'GET',
      params: {
        password,
        phone,
      },
    })
    .then(response => {
      if (response.status.code !== 200) {
        // Handle error on login page
        return Promise.reject(response);
      }
      // On success, go to new page
      store.dispatch(
        'resetAndSetPageName',
        {
          pageName: PageNames.SELECT_PROFILE,
        },
        { root: true }
      );
      return store.commit('SET_STATE', {
        facility,
        phone,
        password,
        profiles: response.entity,
      });
    });
}

export function createProfile(store, profileName) {
  const { phone, password } = store.state;
  return httpClient({
    path: urls['kolibri:user:phoneaccountprofile_list'](),
    method: 'POST',
    entity: {
      full_name: profileName,
      password,
      phone,
    },
  }).then(response => {
    if (response.status.code !== 201) {
      return Promise.reject(response);
    }
    return store.commit('ADD_PROFILE', {
      full_name: profileName,
      username: response.entity,
      isNew: true,
    });
  });
}
