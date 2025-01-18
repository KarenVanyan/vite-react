import styles from './index.module.css';
import { Button, Input, Divider } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import type { GetProps } from 'antd';
import { TContact } from '../../../../interface.ts';
import ManageContacts from '../ManageContacts';

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

const Contacts = ({
  contacts,
  selectedContact,
  handleSelectContact,
}: {
  contacts: TContact[] | null;
  selectedContact: TContact | null;
  handleSelectContact: (value: TContact) => void;
}) => {
  const [createContactVisible, setCreateContactVisible] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState<TContact[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const handleSearch: SearchProps['onSearch'] = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useEffect(() => {
    if (!!searchValue) {
      const filtered = contacts?.filter((contact: TContact) =>
        contact.fullName?.toLowerCase().includes(searchValue?.toLowerCase()),
      );
      setFilteredContacts(filtered || []);
    }
  }, [contacts, searchValue]);

  const toggleCreateContact = useCallback((value: boolean) => {
    setCreateContactVisible(value);
  }, []);

  return (
    <>
      <div className={styles.searchWrapper}>
        <Search
          placeholder="Search Contacts"
          onSearch={handleSearch}
          onChange={(e) => {
            if (!e.target.value) {
              setSearchValue('');
            }
          }}
          size="large"
        />
        <Button
          onClick={() => toggleCreateContact(true)}
          type="primary"
          size="middle"
        >
          New
        </Button>
      </div>
      <Divider />
      <div>
        {(!!searchValue ? filteredContacts : contacts)?.map((value) => {
          return (
            <div
              key={value.id}
              className={
                selectedContact?.id === value.id
                  ? styles.contactWrapperActive
                  : styles.contactWrapper
              }
              onClick={() => handleSelectContact(value)}
            >
              {value.fullName}
            </div>
          );
        })}
      </div>
      <ManageContacts
        handleSelectContact={handleSelectContact}
        open={createContactVisible}
        toggleCreateContact={toggleCreateContact}
      />
    </>
  );
};

export default Contacts;
