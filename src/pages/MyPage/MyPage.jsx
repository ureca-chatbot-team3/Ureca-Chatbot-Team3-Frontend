import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MyPageSidebar from './components/MyPageSidebar';
import toast from 'react-hot-toast';

const MyPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || 'user@example.com',
    birthYear: '',
    nickname: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // 입력 필드 변경 핸들러
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 저장 버튼 활성화 조건 (닉네임 또는 출생연도가 입력된 경우)
  const isSaveEnabled = formData.nickname.trim() || formData.birthYear.trim();

  // 저장 핸들러
  const handleSave = () => {
    if (!isSaveEnabled) return;
    toast.success('정보가 저장되었습니다.');
  };

  // 비밀번호 변경 핸들러
  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    toast.success('비밀번호가 변경되었습니다.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordForm(false);
  };

  const handleCurrentPasswordCheck = () => {
    if (!passwordData.currentPassword) {
      toast.error('현재 비밀번호를 입력해주세요.');
      return;
    }
    setShowPasswordForm(true);
  };

  const handleCancel = () => {
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <main className="max-w-[1440px] mx-auto px-[20px] py-[60px]">
      <div className="flex">
        <MyPageSidebar />

        <div className="flex-1">
          {/* 1. 개인정보 수정 타이틀 - heading-1 font-500 */}
          <h2 className="heading-1 font-500 text-black mb-[44px]">개인정보 수정</h2>

          {/* 2-5. 폼 필드들 - 16px gap */}
          <div className="space-y-[16px] mb-[30px]">
            {/* 2. 이메일 */}
            <div>
              <label className="block heading-3 font-500 text-black mb-[16px]">이메일</label>
              <div className="text-black heading-3 font-400">{formData.email}</div>
            </div>

            {/* 3. 출생연도 */}
            <div>
              <label className="block heading-3 font-500 text-black mb-[16px]">출생연도</label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={formData.birthYear}
                  onChange={(e) => handleInputChange('birthYear', e.target.value)}
                  className="w-[200px] h-[56px] px-[20px] border border-gray-400 bg-white text-black rounded-[8px] heading-3 font-400 focus:outline-none focus:border-pink-700"
                  placeholder="2000"
                />
                <span className="ml-[12px] heading-3 font-400 text-black">년</span>
              </div>
            </div>

            {/* 4. 닉네임 */}
            <div>
              <label className="block heading-3 font-500 text-black mb-[16px]">닉네임</label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
                className="w-full h-[56px] px-[20px] border border-gray-400 bg-white text-black rounded-[8px] heading-3 font-400 focus:outline-none focus:border-pink-700"
                placeholder="닉네임을 입력해주세요"
              />
            </div>
          </div>

          {/* 6. 비밀번호 변경과 저장 버튼 */}
          <div className="flex items-center gap-[16px] mb-[30px]">
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="h-[44px] px-[24px] border border-gray-400 bg-white text-black rounded-[8px] heading-3 font-500 hover:bg-gray-50 transition-colors"
            >
              비밀번호 변경
            </button>

            {/* 7. 저장 버튼 - 조건부 활성화 */}
            <button
              onClick={handleSave}
              disabled={!isSaveEnabled}
              className={`h-[44px] px-[24px] rounded-[8px] heading-3 font-500 transition-colors ${
                isSaveEnabled
                  ? 'bg-pink-700 text-white hover:opacity-90'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              저장
            </button>
          </div>

          {/* 비밀번호 변경 폼 */}
          {showPasswordForm && (
            <div className="border-t border-gray-300 pt-[30px]">
              <h3 className="heading-2 font-500 text-black mb-[20px]">비밀번호 변경</h3>

              <div className="space-y-[16px] mb-[30px]">
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full h-[56px] px-[20px] border border-gray-400 rounded-[8px] heading-3 font-400 text-black focus:outline-none focus:border-pink-700"
                  placeholder="현재 비밀번호를 입력해 주세요"
                />
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full h-[56px] px-[20px] border border-gray-400 rounded-[8px] heading-3 font-400 text-black focus:outline-none focus:border-pink-700"
                  placeholder="새로운 비밀번호를 입력해 주세요"
                />
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full h-[56px] px-[20px] border border-gray-400 rounded-[8px] heading-3 font-400 text-black focus:outline-none focus:border-pink-700"
                  placeholder="새로운 비밀번호를 다시 입력해 주세요"
                />
              </div>

              <div className="flex justify-end gap-[12px]">
                <button
                  onClick={handleCancel}
                  className="h-[44px] px-[24px] bg-gray-400 text-white rounded-[8px] heading-3 font-500 hover:opacity-90 transition-opacity"
                >
                  취소
                </button>
                <button
                  onClick={handlePasswordUpdate}
                  className="h-[44px] px-[24px] bg-pink-700 text-white rounded-[8px] heading-3 font-500 hover:opacity-90 transition-opacity"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyPage;
