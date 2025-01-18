import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';
import Contacts from './components/Contacts';
import { fetchContacts } from '../../services';
import { TContact } from '../../interface.ts';
import SelectedContact from './components/SelectedContact';
import styles from './index.module.css';

const Home = () => {
  const [selectedContact, setSelectedContact] = useState<TContact | null>(null);
  const [isEffectRun, setIsEffectRun] = useState(false);

  const handleSelectContact = useCallback((value: TContact | null) => {
    setSelectedContact(value);
  }, []);

  const { data } = useQuery({
    queryKey: ['contacts'],
    queryFn: fetchContacts,
  });

  useEffect(() => {
    if (data && !isEffectRun) {
      setSelectedContact(data?.[0]);
      setIsEffectRun(true);
    }
  }, [data, isEffectRun]);

  return (
    <Row className={styles.homeWrapper}>
      <Col span={6} className={styles.contactsSection}>
        <Contacts
          contacts={data}
          handleSelectContact={handleSelectContact}
          selectedContact={selectedContact}
        />
      </Col>
      <Col span={18}>
      {!!selectedContact && (
        <SelectedContact
          contacts={data}
          selectedContact={selectedContact}
          handleSelectContact={handleSelectContact}
        />
      )}
      </Col>
    </Row>
  );
};

export default Home;
